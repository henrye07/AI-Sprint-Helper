from typing import List
from sqlalchemy.orm import Session
from . import models
from app.core.logger import logger


def create_meeting(db: Session, raw_text: str, summary: str | None = None) -> models.Meeting:
    meeting = models.Meeting(raw_text=raw_text, summary=summary)
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    logger.debug(f"Created meeting: ID={meeting.id}")
    return meeting


def create_tasks(db: Session, task_dicts: List[dict],meeting_id: int):
    tasks = []
    logger.debug(f"Saving tasks: {task_dicts}")
    for t in task_dicts:
        task = models.Task(
            meeting_id=meeting_id,
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

def get_last_meeting(db: Session):
    return (
        db.query(models.Meeting)
        .order_by(models.Meeting.id.desc())
        .first()
    )


def get_last_meeting_tasks(db: Session):
    last = get_last_meeting(db)
    if not last:
        return []
    logger.debug(f"Fetching last meeting: {last.id if last else 'None'}")
    return last.tasks