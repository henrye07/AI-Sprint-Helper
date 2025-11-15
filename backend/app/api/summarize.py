from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.llm import call_llm
from app.db.database import get_db
from app.core.json_utils import extract_json

router = APIRouter()


class SummarizeRequest(BaseModel):
    raw_text: str


class SummarizeResponse(BaseModel):
    summary: str
    decisions: list[str]
    action_items: list[str]


@router.post("/", response_model=SummarizeResponse)
def summarize_meeting(payload: SummarizeRequest, db: Session = Depends(get_db)):
    system_prompt = """
You are a meeting summarization assistant.

Return ONLY valid JSON in the following exact schema:

{
  "summary": string,
  "decisions": [string],
  "action_items": [string]
}
"""

    prompt = f"""
Summarize the following meeting transcript and extract decisions + action items.

Transcript:
{payload.raw_text}

Return ONLY JSON. Do not include commentary.
"""

    raw_output = call_llm(prompt, system_prompt)
    obj = extract_json(raw_output)

    return SummarizeResponse(
        summary=obj.get("summary", ""),
        decisions=obj.get("decisions", []),
        action_items=obj.get("action_items", []),
    )
