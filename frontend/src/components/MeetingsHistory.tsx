import { useEffect, useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { updateTask, deleteTask, updateTaskStatus } from "../api/backend";
import { Task } from "../api/types";

import "./meetings.css";

export default function MeetingsHistory({ onOpenMeeting }: any) {
  const [meetings, setMeetings] = useState([]);
  const [selectedTask, setSelectedTask] = useState< Task | null>(null);
  const [activeMeeting, setActiveMeeting] = useState<number | null>(null);

  async function loadMeetings() {
    const res = await fetch("http://127.0.0.1:8000/meetings");
    setMeetings(await res.json());
  }

  useEffect(() => {
    console.log(meetings);
    loadMeetings();
  }, []);

  return  (
  <div className="card">
      <h2>Meetings History</h2>
      <div className="meeting-list">
        {meetings.map((m: any) => (
          <div onClick={() => onOpenMeeting(m.id)} key={m.id} className="meeting-card">
              <div >
                <h3  className="meeting-title-clickable">Meeting #{m.id}</h3>
                <p className="meeting-date">{m.created_at}</p>
              </div>
          </div>
        ))}
      </div>

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
