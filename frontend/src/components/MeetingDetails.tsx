import { useEffect, useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { updateTask, deleteTask, updateTaskStatus } from "../api/backend";
import { SprintModel, SprintPlan, Task } from "../api/types";
import SprintCapacityModal from "./SprintCapacityModal";

export default function MeetingDetails({
  meetingId,
  onBack,
  onOpenSprint,
}: any) {
  const [meeting, setMeeting] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [savingSprint, setSavingSprint] = useState(false);
  const [aiResult, setAiResult] = useState<SprintPlan | null>(null);
  const [sprints, setSprints] = useState<SprintModel[]>([]);

  async function loadMeeting() {
    const res = await fetch(`http://127.0.0.1:8000/meetings/${meetingId}`);
    setMeeting(await res.json());
  }

  async function generateAISprint(capacity: number) {
    const res = await fetch("http://127.0.0.1:8000/plan_sprint_ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meeting_summary: meeting.summary,
        tasks: meeting.tasks,
        sprint_capacity: capacity,
      }),
    });

    const data = await res.json();
    setAiResult(data);
  }
  async function saveSprint() {
    if (!aiResult) return;

    try {
      setSavingSprint(true);
      const res = await fetch("http://127.0.0.1:8000/sprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meeting_id: meetingId,
          name: `Sprint for Meeting #${meetingId}`,
          capacity: aiResult.capacity_used,
          explanation: aiResult.explanation,
          task_ids: aiResult.selected_tasks.map((t) => t.task_id),
        }),
      });

      const data = await res.json();

      loadMeeting();
      loadSprints();
    } finally {
      setSavingSprint(false);
    }
  }

  async function loadSprints() {
    const res = await fetch(
      `http://127.0.0.1:8000/meetings/${meetingId}/sprints`
    );
    const data = await res.json();
    setSprints(data);
  }

  useEffect(() => {
    loadMeeting();
    loadSprints();
  }, [meetingId]);

  if (!meeting) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <button className="btn btn-secondary" onClick={onBack}>
        ← Back
        </button>

      <h2>Meeting #{meeting.id}</h2>
      <p className="meeting-date">Date: {meeting.created_at}</p>

      <section className="section card">
        <h3>Summary</h3>
        <p>{meeting.summary}</p>
      </section>

      {meeting.decisions && meeting.decisions.length > 0 && (
        <section className="section card">
          <h3>Decisions</h3>
          <ul>
            {meeting.decisions.map((d: string, idx: number) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.action_items && meeting.action_items.length > 0 && (
        <section className="section card">
          <h3>Action Items</h3>
          <ul>
            {meeting.action_items.map((a: string, idx: number) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="section card">
        <h3>Tasks ({meeting.tasks.length})</h3>

        <div className="task-grid">
          {meeting.tasks.map((t: any) => (
            <div key={t.id} className="task-card">
              <h4>{t.title}</h4>

              <div className="task-info">
                <span className={`priority ${t.priority}`}>{t.priority}</span>
                <span>{t.effort} pts</span>
              </div>

              <select
                className="status-select"
                value={t.status}
                onChange={async (e) => {
                  await updateTaskStatus(t.id, e.target.value);
                  loadMeeting();
                }}
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => setSelectedTask(t)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={async () => {
                    await deleteTask(t.id);
                    loadMeeting();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={async (payload: any) => {
            await updateTask(selectedTask.id, payload);
            setSelectedTask(null);
            loadMeeting();
          }}
        />
      )}

      <button
        className="primary-btn"
        onClick={() => setShowCapacityModal(true)}
      >
        AI Generate Sprint Plan
      </button>
      {showCapacityModal && (
        <SprintCapacityModal
          onCancel={() => setShowCapacityModal(false)}
          onConfirm={(capacity: number) => {
            setShowCapacityModal(false);
            generateAISprint(capacity);
          }}
        />
      )}
      {aiResult && (
        <div className="card ai-sprint-result">
          <h3>AI Sprint Proposal</h3>

          <p>
            <strong>Capacity Used:</strong> {aiResult.capacity_used}
          </p>
          <p>{aiResult.explanation}</p>

          <h4>Selected Tasks</h4>
          <ul>
            {aiResult.selected_tasks.map((t, idx) => (
              <li key={idx}>
                {t.title} — {t.priority} ({t.effort} pts)
                <br />
                <small>{t.reason}</small>
              </li>
            ))}
          </ul>

          <button
            className="primary-btn"
            onClick={saveSprint}
            disabled={savingSprint}
          >
            {savingSprint ? "Saving..." : "Save Sprint"}
          </button>
        </div>
      )}

      <section className="section card sprint-section">
        <h3>Sprints</h3>

        {sprints.length === 0 && <p>No sprints created yet.</p>}

        {sprints.map((sprint) => (
          <div key={sprint.id} className="sprint-card">
            <div className="sprint-header">
              <h4>{sprint.name}</h4>
              <span className="sprint-capacity">{sprint.capacity} pts</span>
            </div>

            <p className="sprint-date">{sprint.created_at}</p>

            <ul className="sprint-task-list">
              {sprint.tasks.map((task) => (
                <li key={task.id}>
                  {task.title} — {task.priority} ({task.effort} pts)
                </li>
              ))}
            </ul>
            <button
              className="primary-btn"
              onClick={() => onOpenSprint(sprint.id)} // <-- HERE
            >
              View Details
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
