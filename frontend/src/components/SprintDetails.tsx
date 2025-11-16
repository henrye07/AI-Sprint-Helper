import { useEffect, useState } from "react";
import { formatStatus } from "../utils/status";

export default function SprintDetails({ sprintId, onBack }: any) {
  const [sprint, setSprint] = useState<any>(null);

  async function loadSprint() {
    const res = await fetch(`http://127.0.0.1:8000/sprint/${sprintId}`);
    const data = await res.json();
    setSprint(data);
  }

  useEffect(() => {
    loadSprint();
  }, [sprintId]);

  if (!sprint) return <div>Loading...</div>;

  const totalPoints = sprint.tasks.reduce((sum: number, t: any) => sum + (t.effort || 0), 0);
  const donePoints = sprint.tasks
    .filter((t: any) => t.status === "done")
    .reduce((sum: number, t: any) => sum + (t.effort || 0), 0);
  const inProgressPoints = sprint.tasks
    .filter((t: any) => t.status === "in_progress")
    .reduce((sum: number, t: any) => sum + (t.effort || 0), 0);
  const todoPoints = totalPoints - donePoints - inProgressPoints;

  const donePct = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;
  const inProgressPct =
    totalPoints > 0 ? Math.round((inProgressPoints / totalPoints) * 100) : 0;
  const todoPct = 100 - donePct - inProgressPct;

  return (
    <div className="sprint-details-container">
      <button className="btn btn-secondary" onClick={onBack}>
        ← Back
        </button>

      <h2>{sprint.name}</h2>
      <p className="sprint-meta">
        Sprint ID: {sprint.id} · Meeting: {sprint.meeting_id} · Created:{" "}
        {sprint.created_at}
      </p>

      <section className="section card">
        <h3>Capacity & Progress</h3>
        <p>Declared capacity: <strong>{sprint.capacity}</strong> pts</p>
        <p>Total planned: <strong>{totalPoints}</strong> pts</p>

        <div className="progress-bar">
          <div
            className="segment done"
            style={{ width: `${donePct}%` }}
            title={`Done: ${donePoints} pts`}
          />
          <div
            className="segment in-progress"
            style={{ width: `${inProgressPct}%` }}
            title={`In progress: ${inProgressPoints} pts`}
          />
          <div
            className="segment todo"
            style={{ width: `${todoPct}%` }}
            title={`Todo: ${todoPoints} pts`}
          />
        </div>

        <div className="progress-legend">
          <span className="legend-item">
            <span className="dot done" /> Done ({donePoints} pts)
          </span>
          <span className="legend-item">
            <span className="dot in-progress" /> In Progress ({inProgressPoints} pts)
          </span>
          <span className="legend-item">
            <span className="dot todo" /> Todo ({todoPoints} pts)
          </span>
        </div>
      </section>

      <section className="section card">
        <h3>Tasks in Sprint</h3>
        <div className="sprint-tasks-grid">
          {sprint.tasks.map((t: any) => (
            <div key={t.id} className="sprint-task-card">
              <div className="task-header-line">
                <h4>{t.title}</h4>
                <span className={`status-pill ${t.status}`}>
  {formatStatus(t.status)}
</span>
              </div>
              <p className="task-meta">
                Priority: <strong>{t.priority}</strong> · Effort:{" "}
                <strong>{t.effort}</strong> pts
              </p>
              {t.assignee && (
                <p className="task-meta">
                  Assignee: <strong>{t.assignee}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
