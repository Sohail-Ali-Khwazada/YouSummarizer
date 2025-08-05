# 🎥 YouSummarizer

[](https://www.google.com/search?q=) [](https://www.google.com/search?q=) [](https://www.google.com/search?q=) [](https://www.google.com/search?q=)

**YouSummarizer** is a full-stack AI-powered web application that allows users to **summarize YouTube videos**, **chat with the video**, explore **auto-generated chapters**, and take **rich-text notes**—all in a sleek, responsive UI.

This project combines **RAG (Retrieval-Augmented Generation)** using **LangChain**, **Faiss**, and **LLMs** via a Python Flask microservice with a MERN-based application frontend.

<br>

> **Note:** This README provides a comprehensive guide to understanding, setting up, and running the project locally.

## 🚀 Key Features

  - 🔍 **AI-Powered Summaries**: Generate concise summaries from lengthy YouTube video transcripts using advanced LLM pipelines.
  - 💬 **Chat with Video**: Engage in a conversation with the video's content through a RAG-powered semantic search backend.
  - 📄 **Interactive Transcript**: View the full transcript with auto-scroll syncing and click-to-seek video functionality.
  - 🧩 **Automatic Chapter Generation**: Quickly navigate through video topics with auto-generated, timestamped chapters.
  - ✍️ **Rich Text Note Editor**: Take and format notes directly within the app, with persistent storage for each user.
  - 🔐 **Secure Authentication**: Features secure Google Sign-In using OAuth 2.0 and JWT for session management.
  - 🌈 **Dynamic & Animated UI**: A modern, user-friendly interface built with Tailwind CSS, Shadcn UI, and GSAP animations.

-----

## 📽️ Demo

[![Watch the demo](https://img.youtube.com/vi/993lIF3qSVY/hqdefault.jpg)](https://youtu.be/993lIF3qSVY)

> Click the thumbnail above to watch the demo of **YouSummarizer**.


-----

## 🧠 RAG Architecture

The core AI functionality is powered by a Retrieval-Augmented Generation (RAG) pipeline that seamlessly integrates multiple components:

1.  **📜 Transcript Loader**: Fetches the video transcript using the `YouTranscript` API.
2.  **✂️ Text Splitter**: Divides the full transcript into smaller, manageable chunks for processing.
3.  **🧠 Embedding & Storage**: Creates vector embeddings for each chunk and stores them in a **Faiss** vector store for efficient similarity search.
4.  **🔗 LangChain Orchestration**: Manages the flow of data, retrieves relevant chunks based on user queries, and formats prompts for the LLM.
5.  **🤖 Generation**: The LLM (Gemini) generates summaries, chat responses, or chapters based on the retrieved context.
6.  **Flask API**: A Python-based microservice that exposes the RAG pipeline's functionalities via RESTful API endpoints.

-----

## 🛠️ Tech Stack

### Frontend

  - **React (Vite)**
  - **TypeScript**
  - **Tailwind CSS**
  - **Shadcn UI**
  - **GSAP** (for animations)
  - `react-youtube`

### Backend (MERN)

  - **Node.js**
  - **Express.js**
  - **MongoDB** + **Mongoose**
  - **JWT** (JSON Web Tokens) for Authentication
  - **Google OAuth 2.0**

### AI Microservice

  - **Python** + **Flask**
  - **LangChain**
  - **Faiss** (Vector Store)
  - **Gemini API**
  - **YouTranscript API**

-----

## ⚙️ Local Setup & Installation

Follow these steps to set up and run the project on your local machine.

### 1\. Prerequisites

  - Node.js (v18 or later)
  - Python (v3.9 or later)
  - MongoDB account (for connection URI)
  - Google Cloud Console Project (for OAuth and API keys)

### 2\. Clone the Repository

```bash
git clone https://github.com/your-username/yousummarizer.git
cd yousummarizer
```

### 3\. Configure Environment Variables

You will need to create `.env` files in the `frontend`, `backend`, and `services` directories.


#### `frontend/.env`

```env
VITE_BACKEND_URI="http://localhost:5000"
```

#### `backend/.env`

```env
PORT=5000
MONGO_URI="your_mongodb_connection_string_here"
ACCESS_TOKEN_SECRET="your_strong_jwt_secret_here"
FLASK_URI="http://localhost:8080"
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

#### `services/.env`

```env
GOOGLE_API_KEY="your_google_api_key_for_gemini_or_other_services"
```

### 4\. Install Dependencies & Run

Run each component (backend, frontend, services) in a separate terminal.

#### **Terminal 1: Backend (Node.js)**

```bash
cd backend
npm install
npm run dev
```

> The backend server will start on `http://localhost:5000`.

#### **Terminal 2: AI Microservice (Python)**

```bash
cd services
python -m venv venv
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

> The Flask service will start on `http://localhost:8080`.

#### **Terminal 3: Frontend (React)**

```bash
cd frontend
npm install
npm run dev
```

> The application will be accessible at **[http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)**.

-----
