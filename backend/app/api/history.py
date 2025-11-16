from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter()

@router.get("/", tags=["history"])
def list_meetings(db: Session = Depends(get_db)):
    meetings = db.query(models.Meeting).order_by(models.Meeting.id.desc()).all()
    return [
        {
            "id": m.id,
            "summary": m.summary,
            "created_at": m.created_at.isoformat(),
            "tasks": [
                {
                    "id": t.id,
                    "title": t.title,
                    "priority": t.priority,
                    "effort": t.effort,
                    "status": t.status,
                }
                for t in m.tasks
            ]
        }
        for m in meetings
    ]

@router.get("/{meeting_id}")
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    print(meeting, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return {
        "id": meeting.id,
        "summary": meeting.summary,
        "raw_text": meeting.raw_text,
        "created_at": meeting.created_at.isoformat(),
        "tasks": [
            {
                "id": t.id,
                "title": t.title,
                "priority": t.priority,
                "effort": t.effort,
                "status": t.status,
                "tags": t.tags.split(",") if t.tags else []
            }
            for t in meeting.tasks
        ]
    }


@router.get("/{meeting_id}/sprints")
def list_sprints(meeting_id: int, db: Session = Depends(get_db)):
    sprints = (
        db.query(models.Sprint)
        .filter(models.Sprint.meeting_id == meeting_id)
        .order_by(models.Sprint.id.desc())
        .all()
    )

    return [
        {
            "id": s.id,
            "name": s.name,
            "capacity": s.capacity,
            "created_at": s.created_at.isoformat(),
            "tasks": [
                {
                    "id": t.id,
                    "title": t.title,
                    "priority": t.priority,
                    "effort": t.effort,
                    "status": t.status,
                }
                for t in s.tasks
            ]
        }
        for s in sprints
    ]