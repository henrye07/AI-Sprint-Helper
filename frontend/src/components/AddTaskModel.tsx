import { useState } from "react";

export default function AddTaskModal({ onCancel, onSave, meetingId }:any) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [effort, setEffort] = useState(1);
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");

  function submit() {
    if (!title.trim()) return;
    onSave({
      meeting_id: meetingId,
      title,
      priority,
      effort,
      assignee: assignee.trim() || null,
      description: description.trim() || null,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Task</h3>

        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label>Effort (story points)</label>
        <input
          type="number"
          min="1"
          value={effort}
          onChange={(e) => setEffort(Number(e.target.value))}
        />

        <label>Assignee (optional)</label>
        <input
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />

        <label>Description (optional)</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={submit}>Save</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
