from fastapi import APIRouter
from . import summarize, extract, sprint, chat

api_router = APIRouter()

api_router.include_router(summarize.router, prefix="/summarize", tags=["summarize"])
api_router.include_router(extract.router, prefix="/extract", tags=["extract"])
api_router.include_router(sprint.router, prefix="/sprint", tags=["sprint"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
