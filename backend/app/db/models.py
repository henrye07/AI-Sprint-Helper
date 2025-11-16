from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), nullable=True)
    sprint_id = Column(Integer, ForeignKey("sprints.id"), nullable=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(50), default="medium")
    effort = Column(Integer, default=1)
    assignee = Column(String(255), nullable=True)
    status = Column(String(50), default="todo")
    tags = Column(Text, nullable=True)  # simple comma-separated for now

    meeting = relationship("Meeting", back_populates="tasks")
    sprint = relationship("Sprint", back_populates="tasks")


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    raw_text = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    tasks = relationship("Task", back_populates="meeting")
    sprints = relationship("Sprint", back_populates="meeting")


class Sprint(Base):
    __tablename__ = "sprints"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), nullable=False)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    explanation = Column(Text, nullable=True)
    capacity = Column(Integer, default=5)

    meeting = relationship("Meeting", back_populates="sprints")
    tasks = relationship("Task", back_populates="sprint", lazy="select")