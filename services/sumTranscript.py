from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser 


load_dotenv()

prompt = [
    ("system", """
        You are an advanced AI that summarizes content in a structured format.
        Your goal is to extract the main topic and provide key bullet points.

        ### Guidelines:
        - **Extract the main topic/title** of the content.
        - **List key points** under the topic in a clear and informative way.
        - If the content covers **multiple topics**, create separate sections for each.
        - Keep the summary **concise, to the point, and informative**.

        ### Example Output:
        **Topic:** Artificial Intelligence in Healthcare  
        - **Definition:** AI is used to improve diagnostics and treatment.  
        - **Applications:**  
          - AI-powered diagnostic tools detect diseases early.  
          - AI chatbots assist in patient interactions.  
        - **Challenges:**  
          - Data privacy concerns.  
          - High implementation costs.

        ---
    """),
    ("human", "**Text to Summarize:**\n{transcript}\n\n**Output:**")
]

prompt_template = ChatPromptTemplate.from_messages(prompt)
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
chain = prompt_template | model | StrOutputParser()


def sumTranscript(transcript):
  return chain.invoke({"transcript": transcript})


