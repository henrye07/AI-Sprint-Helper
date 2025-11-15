from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SprintTask(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    effort: int = 1
    assignee: str | None = None


class Developer(BaseModel):
    name: str
    capacity: int  # story points available


class PlanSprintRequest(BaseModel):
    tasks: list[SprintTask]
    developers: list[Developer]
    sprint_capacity: int


class PlanSprintResponse(BaseModel):
    selected_tasks: list[SprintTask]
    capacity_used: int
    explanation: str


@router.post("/", response_model=PlanSprintResponse)
def plan_sprint(payload: PlanSprintRequest):
    sorted_tasks = sorted(
        payload.tasks,
        key=lambda t: {"high": 3, "medium": 2, "low": 1}.get(t.priority, 2),
        reverse=True,
    )

    selected = []
    capacity_left = payload.sprint_capacity

    for t in sorted_tasks:
        if t.effort <= capacity_left:
            selected.append(t)
            capacity_left -= t.effort

    explanation = (
        f"Selected {len(selected)} tasks based on priority and capacity "
        f"(capacity used: {payload.sprint_capacity - capacity_left})."
    )

    return PlanSprintResponse(
        selected_tasks=selected,
        capacity_used=payload.sprint_capacity - capacity_left,
        explanation=explanation,
    )
