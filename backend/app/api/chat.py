from fastapi import APIRouter
from pydantic import BaseModel

from app.core.llm import call_llm

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post("/", response_model=ChatResponse)
def chat(payload: ChatRequest):
    system_prompt = (
        "You are an AI assistant helping with software project management and sprint planning. "
        "Answer concisely and clearly."
    )

    reply = call_llm(payload.message, system_prompt)
    return ChatResponse(reply=reply)
