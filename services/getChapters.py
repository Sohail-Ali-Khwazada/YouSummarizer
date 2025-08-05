from langchain_core.documents import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from utils import chunkingConfig,clean_json_string
import json

load_dotenv()

def prepare_text(transcript_array):
    """Converting transcript array into a single large string with timestamps."""
    return "\n".join([f"[{item['timestamp']}] {item['text']}" for item in transcript_array])

def generate_chapters(transcript_array):
    full_text = prepare_text(transcript_array)
    chunk_size, chunk_overlap = chunkingConfig(full_text)
    docs = [Document(page_content=full_text)]
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    docs = splitter.split_documents(docs)

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")  
    parser = StrOutputParser()

    prompt = PromptTemplate.from_template("""
    You are a helpful assistant that generates YouTube-style chapters for a podcast.
    Given a chunk of a podcast transcript, identify key topics, and create chapters.

    Each chapter must have:
    - a "startTime" (timestamp from the transcript)
    - a "title" (brief and catchy)
    - a "description" (2-4 lines summary of the content)

    Only include chapters that begin a new topic. Avoid redundancy.

    Return the result as a JSON array, and **ONLY** the JSON array — do **not** add any extra text, explanation, or markdown formatting.
    Do **not** surround the JSON with triple backticks or any other characters.
    Make sure the JSON is strictly valid and parseable, with all property names and string values in double quotes.

    Example:
    [
        { "startTime": "00:10:00", "title": "AI in Healthcare", "description": "We explore how artificial intelligence is transforming healthcare." }
    ]

    Transcript chunk:
    {context}
    """)

    
    chain = prompt | llm | parser

    all_chapters = []
    for chunk in docs:
        response = chain.invoke({"context": chunk.page_content})
        try:
            cleaned_response = clean_json_string(response)
            chunk_chapters = json.loads(cleaned_response)
            if isinstance(chunk_chapters, list):
                all_chapters.extend(chunk_chapters)
            else:
                print(f"Warning: LLM response for chunk was not a list")
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON from LLM response for chunk: {e}\nResponse: {response[:200]}...") 
        except Exception as e:
            print(f"An unexpected error occurred processing chunk: {e}")

    return all_chapters

