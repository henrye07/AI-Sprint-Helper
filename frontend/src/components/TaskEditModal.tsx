import { useState, useEffect } from "react";

export default function TaskEditModal({ task, onSave, onClose }: any) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [effort, setEffort] = useState(task?.effort || 1);
  const [tags, setTags] = useState<string>(
    Array.isArray(task?.tags) ? task.tags.join(", ") : task?.tags || ""
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>

        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} rows={4}
                  onChange={e => setDescription(e.target.value)} />

        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Effort (points)</label>
        <input type="number" value={effort} min={1}
               onChange={e => setEffort(parseInt(e.target.value))} />

        <label>Tags (comma separated)</label>
        <input value={tags} onChange={e => setTags(e.target.value)} />

        <div className="modal-buttons">
          <button
            onClick={() =>
              onSave({
                title,
                description,
                priority,
                effort,
                tags: tags.split(",").map(t => t.trim())
              })
            }
          >
            Save
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
