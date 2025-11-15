from fastapi import APIRouter, Depends
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
