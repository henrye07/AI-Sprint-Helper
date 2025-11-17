# 🚀 AI-Powered Meeting Summarizer & Project Management Assistant
### _(Software Engineering + Project Management Capstone Project)_

This project is an **AI-driven tool designed to improve the software development lifecycle** by automating meeting analysis, generating structured documentation, and assisting with task & sprint management.

It integrates a **meeting summarizer**, an **AI documentation assistant**, and a **project-management helper**—all in a single, modular application.

---

## ✨ Features (Current Stage)

### ✅ 1. AI Meeting Summarizer
Automatically generates:
- A concise summary  
- Action items  
- Important decisions  
- Tasks for team members  
- Sprint-ready breakdowns

Powered by **Anthropic Claude models** using a clean backend abstraction for LLM calls.

---

### ✅ 2. AI Chatbot
A contextual chatbot that can:
- Answer questions about meetings  
- Clarify decisions  
- Expand task descriptions  
- Provide recommendations based on meeting content  

Uses the same backend engine following a conversational schema.

---

### ✅ 3. Project Documentation Assistant (Initial Version)
Generates structured documentation using:
- Meeting outputs  
- Tasks  
- Decisions  
- Sprint breakdowns  

Currently focused on clean and consistent formatting.

---

### ✅ 4. Backend Integration (Progress)
The backend is being migrated from OpenAI to **Anthropic**.  
Completed so far:
- Centralized Anthropic client (`get_client`)  
- Unified LLM wrapper (`call_llm()`)  
- Prompt organization and templates  
- Error handling compatible with Anthropic’s API  
- Endpoint migration to Anthropic message format  

---

## ⚙️ Environment Setup

Before running the backend, **you must create a `.env` file** in the project root(backend):
ANTHROPIC_API_KEY=your_api_key_here

The `ANTHROPIC_API_KEY` is required for all LLM-driven features (summaries, tasks, chatbot, documentation).

Make sure not to commit `.env` files to GitHub.  
The project includes `.gitignore` rules for this purpose.

---

## 🏗️ Architecture Overview
```
/backend
├── api/ # Conversational interface, Meeting summarization, Documentation assistant
│
├── db/ #sqlite configuration, pydantic models
│
│── core/ # Env, settings, keys, Anthropic client wrapper
│
└── main.py # FastAPI root

/frontend
├── components/
├── pages/
├── services/
└── ...
```
## 🛠️ Tech Stack

### **Backend**
- FastAPI  
- Anthropic Chat API  
- Python 3.10+  
- Pydantic  

### **Frontend**  
_(initial structure, to be finalized)_  
- React / Tauri

---

## 🎯 Project Goals (Next Steps)
- Improve Anthropic message schema support  
- Enable audio upload + automatic speech-to-text  
- Generate complete sprint plans with priorities  
- Create a frontend UI for summaries, tasks, and chat  
- Add persistent storage (PostgreSQL / SQLite)  

---

## 📌 Project Status
> **Early Development**  
Core summarization, tasks extraction, and chatbot capabilities are functional.  
Anthropic integration is in progress.  
Frontend setup is starting.

---

