from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from pydantic import BaseModel
import json
from app.db import repository
from app.core.logger import logger

from app.core.llm import call_llm

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post("/", response_model=ChatResponse)
def chat(payload: ChatRequest,db: Session = Depends(get_db)):
    # 1. get last meeting summary
    last_meeting = repository.get_last_meeting(db)
    meeting_summary = last_meeting.summary if last_meeting else None

    # 2. get tasks from that meeting
    tasks = repository.get_last_meeting_tasks(db)

    tasks_json = []
    for t in tasks:
        tasks_json.append({
            "title": t.title,
            "description": t.description,
            "priority": t.priority,
            "effort": t.effort,
            "status": t.status,
            "tags": t.tags.split(",") if t.tags else []
        })

    system_prompt = f"""
        You are an AI assistant helping with software project management and sprint planning. 
        Answer concisely and clearly.
        Here is the summary of the last meeting:
        {meeting_summary}
        Here are the tasks extracted from that meeting as JSON:
        {json.dumps(tasks_json, indent=2)}
        Use ONLY this information to answer the user's question.
        If the user asks about tasks or priorities, use this task list.
        If the user asks about decisions or context, use the meeting summary.
        Do not ask for tasks again unless the user says they changed.
    """

    logger.info("Chat request received")
    logger.debug(f"User message: {payload.message}")
    logger.debug(f"Meeting summary loaded:\n{meeting_summary}")
    logger.debug(f"Tasks loaded:\n{json.dumps(tasks_json, indent=2)}")

    reply = call_llm(payload.message, system_prompt)
    return ChatResponse(reply=reply)
