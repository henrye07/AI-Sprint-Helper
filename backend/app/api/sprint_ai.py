from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.llm import call_llm
from app.core.logger import logger
import json

router = APIRouter()

class SelectedTask(BaseModel):
    task_id: int
    title: str
    priority: str
    effort: int
    reason: str

class SprintAIRequest(BaseModel):
    meeting_summary: str
    tasks: list[dict]
    sprint_capacity: int

class SprintAIResponse(BaseModel):
    selected_tasks: list[SelectedTask]
    capacity_used: int
    explanation: str

SPRINT_PROMPT = """
You are an expert Agile Sprint Planning Assistant.

You will receive:
- Meeting summary
- List of tasks with priority and effort
- Sprint capacity

Your task:
1. Select which tasks should go into the next sprint.
2. Stay within the sprint capacity.
3. Favor high-priority tasks.
4. Consider complexity, risk, dependencies.
5. Output valid JSON ONLY:

{
  "selected_tasks": [
    {
      "task_id": 0,
      "title": "",
      "priority": "",
      "effort": 0,
      "reason": ""
    }
  ],
  "capacity_used": 0,
  "explanation": ""
}
"""

@router.post("/", response_model=SprintAIResponse)
def plan_sprint_ai(payload: SprintAIRequest):

    user_message = f"""
Meeting summary:
{payload.meeting_summary}

Tasks:
{json.dumps(payload.tasks, indent=2)}

Sprint capacity: {payload.sprint_capacity}
"""

    logger.debug("Sending AI sprint planning request to Claude")

    raw = call_llm(user_message,SPRINT_PROMPT)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON from Claude: {raw}")
        raise

    return SprintAIResponse(
        selected_tasks=data["selected_tasks"],
        capacity_used=data["capacity_used"],
        explanation=data["explanation"],
    )
