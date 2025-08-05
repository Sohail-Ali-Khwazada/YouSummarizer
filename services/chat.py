from langchain_core.documents import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from utils import chunkingConfig
from dotenv import load_dotenv

load_dotenv()

# Global cache
vector_store = None
main_chain = None

def format_docs(documents):
    return "\n\n".join(doc.page_content for doc in documents)

def update_vector_store(transcript):
    global vector_store, main_chain

    docs = [Document(page_content=transcript)]
    chunk_size,chunk_overlap = chunkingConfig(transcript)
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    chunks = splitter.split_documents(docs)

    embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_documents(chunks, embedding)
    retriever = vector_store.as_retriever()

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt = PromptTemplate.from_template("""
    You are a helpful AI assistant. Answer the question strictly based ONLY on the transcript context provided below.

    CONTEXT:
    -----------------
    {context}
    -----------------

    INSTRUCTIONS:
    - Use ONLY the information in the CONTEXT above to answer.
    - Synthesize and paraphrase the information from the transcript in your own words whenever possible.
    - Use a short, direct quote ONLY if a precise phrase from the transcript is essential for clarity or evidence.
    - DO NOT copy large sections of the transcript or rely solely on similar-sounding text.
    - If the answer is missing, unclear, or cannot be determined from the context, respond ONLY with: "I could not find the answer in the transcript."
    - DO NOT use any prior knowledge or add information not explicitly stated or clearly implied in the context.

    QUESTION: {question}

    Answer:
    """)


    parser = StrOutputParser()

    parallel_chain = RunnableParallel({
        'context': retriever | RunnableLambda(format_docs),
        'question': RunnablePassthrough()
    })

    main_chain = parallel_chain | prompt | llm | parser

def ask_question(question):
    if main_chain is None:
        raise ValueError("Vector store not initialized.")
    ans = main_chain.invoke(question)
    return ans
