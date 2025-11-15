from fastapi import APIRouter
from pydantic import BaseModel

from app.core.llm import call_llm
from app.core.json_utils import extract_json

router = APIRouter()


class ExtractTasksRequest(BaseModel):
    summary: str


class TaskModel(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    effort: int = 1
    tags: list[str] = []


class ExtractTasksResponse(BaseModel):
    tasks: list[TaskModel]


@router.post("/", response_model=ExtractTasksResponse)
def extract_tasks(payload: ExtractTasksRequest):
    system_prompt ="""
You extract actionable development tasks.
Return ONLY a JSON array in this exact format:
[
  {
    "title": string,
    "description": string,
    "priority": "low" | "medium" | "high",
    "effort": integer,
    "tags": [string]
  }
]
"""

    prompt = f"""
Extract all actionable development tasks from this summary:

{payload.summary}

Return ONLY JSON array. No explanation.
"""

    raw_output = call_llm(prompt, system_prompt)
    tasks_json = extract_json(raw_output)

    return ExtractTasksResponse(tasks=tasks_json)
