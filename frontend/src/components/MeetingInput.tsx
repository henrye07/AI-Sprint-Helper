import { useState } from "react";
import { summarizeMeeting, extractTasks } from "../api/backend";

export default function MeetingInput({ onSummary, onTasks }: any) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleProcess() {
    setLoading(true);
    try {
      const sum = await summarizeMeeting(text);
      onSummary(sum);

      const tasks = await extractTasks(sum.summary);
      onTasks(tasks.tasks);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Enter Meeting Notes</h2>
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={handleProcess} disabled={loading}>
        {loading ? "Processing..." : "Summarize & Extract Tasks"}
      </button>
    </div>
  );
}
