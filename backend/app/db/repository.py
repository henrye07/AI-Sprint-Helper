from typing import List
from sqlalchemy.orm import Session
from . import models


def create_meeting(db: Session, raw_text: str, summary: str | None = None) -> models.Meeting:
    meeting = models.Meeting(raw_text=raw_text, summary=summary)
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting


def create_tasks(db: Session, task_dicts: List[dict]):
    tasks = []
    for t in task_dicts:
        task = models.Task(
            title=t.get("title"),
            description=t.get("description"),
            priority=t.get("priority", "medium"),
            effort=t.get("effort", 1),
            assignee=t.get("assignee"),
            status=t.get("status", "todo"),
            tags=",".join(t.get("tags", [])),
        )
        db.add(task)
        tasks.append(task)
    db.commit()
    for t in tasks:
        db.refresh(t)
    return tasks


def list_tasks(db: Session) -> List[models.Task]:
    return db.query(models.Task).all()
