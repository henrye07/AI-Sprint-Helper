import { useEffect, useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { updateTask, deleteTask, updateTaskStatus } from "../api/backend";
import "./sidebar.css";
import { Task } from "../api/types";

export default function MeetingsHistory() {
  const [meetings, setMeetings] = useState([]);
  const [selectedTask, setSelectedTask] = useState< Task | null>(null);
  const [activeMeeting, setActiveMeeting] = useState<number | null>(null);

  async function loadMeetings() {
    const res = await fetch("http://127.0.0.1:8000/meetings");
    setMeetings(await res.json());
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  return  (
  <div className="card">
      <h2>Meetings History</h2>

      {meetings.map((m: any) => (
        <div key={m.id} className="meeting-entry">
          <h3 onClick={() => setActiveMeeting(m.id)}>
            Meeting #{m.id} — {m.created_at}
          </h3>

          {activeMeeting === m.id && (
            <>
              <p><strong>Summary:</strong></p>
              <p>{m.summary}</p>

              <h4>Tasks</h4>
              <ul>
                {m.tasks.map((t: any) => (
                  <li key={t.id}>
                    <b>{t.title}</b>
                    {" — "}
                    {t.priority} ({t.effort} pts)
                    {" — "}
                    <select
                      value={t.status}
                      onChange={async (e) => {
                        await updateTaskStatus(t.id, e.target.value);
                        loadMeetings();
                      }}
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>

                    <button onClick={() => setSelectedTask(t)}>Edit</button>

                    <button
                      onClick={async () => {
                        await deleteTask(t.id);
                        loadMeetings();
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={async (payload: any) => {
            await updateTask(selectedTask.id, payload);
            setSelectedTask(null);
            loadMeetings();
          }}
        />
      )}
    </div>
  );
}
