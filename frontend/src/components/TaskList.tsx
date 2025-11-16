import { Task } from "../api/types";
import { EmptyState } from "./EmptyState";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks || tasks.length === 0) return(
  <EmptyState
    icon="📭"
    title="No Tasks Yet"
    message="Generate tasks using the AI summarizer."
  />
);

  return (
    <div className="card">
      <h2>Extracted Tasks</h2>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>
            <strong>{task.title}</strong> — {task.priority} ({task.effort} pts)
          </li>
        ))}
      </ul>
    </div>
  );
}
