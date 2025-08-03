from langchain_core.documents import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
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
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)

    embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_documents(chunks, embedding)
    retriever = vector_store.as_retriever()

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt = PromptTemplate.from_template("""
        You are a helpful AI assistant. Use only the context below from a video transcript to answer the user's question. 
        Do not use prior knowledge or make up answers.
        If the answer is not in the context, say: "I could not find the answer in the transcript."
        Context:
        {context}
        Question:
        {question}
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
