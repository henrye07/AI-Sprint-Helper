from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db import models
from app.core.logger import logger

router = APIRouter()

# -----------------------------
# Pydantic Schemas
# -----------------------------

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: str | None = None   # low | medium | high
    effort: int | None = None
    assignee: str | None = None
    status: str | None = None     # todo | in_progress | done
    tags: list[str] | None = None

class TaskStatusUpdate(BaseModel):
    status: str


# -----------------------------
# CRUD Endpoints
# -----------------------------

@router.get("/", tags=["tasks"])
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return [
        {
            "id": t.id,
            "meeting_id": t.meeting_id,
            "title": t.title,
            "description": t.description,
            "priority": t.priority,
            "effort": t.effort,
            "assignee": t.assignee,
            "status": t.status,
            "tags": t.tags.split(",") if t.tags else []
        }
        for t in tasks
    ]


@router.get("/{task_id}", tags=["tasks"])
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "id": task.id,
        "meeting_id": task.meeting_id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "effort": task.effort,
        "assignee": task.assignee,
        "status": task.status,
        "tags": task.tags.split(",") if task.tags else []
    }


@router.put("/{task_id}", tags=["tasks"])
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    logger.debug(f"Updating Task {task_id} with {payload.dict()}")

    if payload.title is not None:
        task.title = payload.title
    if payload.description is not None:
        task.description = payload.description
    if payload.priority is not None:
        task.priority = payload.priority
    if payload.effort is not None:
        task.effort = payload.effort
    if payload.assignee is not None:
        task.assignee = payload.assignee
    if payload.status is not None:
        task.status = payload.status
    if payload.tags is not None:
        task.tags = ",".join(payload.tags)

    db.commit()
    db.refresh(task)

    return {"message": "Task updated successfully"}


@router.delete("/{task_id}", tags=["tasks"])
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}


@router.patch("/{task_id}/status", tags=["tasks"])
def update_task_status(task_id: int, payload: TaskStatusUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = payload.status
    db.commit()
    db.refresh(task)

    return {"message": "Status updated", "task_id": task_id, "status": payload.status}
