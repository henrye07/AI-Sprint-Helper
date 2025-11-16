from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.database import get_db
from app.db import models
from app.core.logger import logger

router = APIRouter()

class SaveSprintResponse(BaseModel):
    sprint_id: int
    message: str

class SprintCreate(BaseModel):
    meeting_id: int
    name: str
    capacity: int
    explanation: str | None = None
    task_ids: list[int]

@router.post("/", tags=["sprint"])
def create_sprint(payload: SprintCreate, db: Session = Depends(get_db)):
    logger.info(f"Creating sprint for meeting {payload.meeting_id}")

    meeting = (
        db.query(models.Meeting)
        .filter(models.Meeting.id == payload.meeting_id)
        .first()
    )
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    sprint = models.Sprint(
        meeting_id=payload.meeting_id,
        name=payload.name,
        capacity=payload.capacity,
        explanation=payload.explanation,
    )
    db.add(sprint)
    db.commit()
    db.refresh(sprint)

    # Attach tasks to sprint
    for task_id in payload.task_ids:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            logger.warning(f"Task {task_id} not found when attaching to sprint {sprint.id}")
            continue
        task.sprint_id = sprint.id

    db.commit()
    

    logger.info(f"Sprint {sprint.id} created with {len(payload.task_ids)} tasks")

    return SaveSprintResponse(message= "Sprint created", sprint_id= sprint.id)


class TaskReturn(BaseModel):
    id : int
    title : str
    description : str | None = None
    priority :str 
    effort : int 
    assignee : str | None = None
    status : str 
    tags : list[str] | None = None

class SprintDetailResponse(BaseModel):
    id: int
    meeting_id: int
    name: str
    capacity: int
    created_at: str
    tasks: list[TaskReturn]


@router.get("/{sprint_id}", response_model=SprintDetailResponse)
def get_sprint(sprint_id: int, db: Session = Depends(get_db)):
    sprint = (
        db.query(models.Sprint)
        .filter(models.Sprint.id == sprint_id)
        .first()
    )
    print(sprint)
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    return SprintDetailResponse(
        id=sprint.id,
        meeting_id=sprint.meeting_id,
        name=sprint.name,
        capacity=sprint.capacity,
        created_at=sprint.created_at.isoformat(),
        tasks=[
            {
                "id": t.id,
                "title": t.title,
                "priority": t.priority,
                "effort": t.effort,
                "status": t.status,
                "assignee": t.assignee,
            }
            for t in sprint.tasks
        ],
    )
