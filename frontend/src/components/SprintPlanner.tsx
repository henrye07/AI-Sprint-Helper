import { useState } from "react";
import { planSprint } from "../api/backend";
import { Task, Developer } from "../api/types";

export default function SprintPlanner({ tasks }: { tasks: Task[] }) {
  const [devs] = useState<Developer[]>([
    { name: "Alice", capacity: 8 },
    { name: "Bob", capacity: 5 },
  ]);
  const [capacity] = useState(13);
  const [result, setResult] = useState<any>(null);

  async function handlePlan() {
    const res = await planSprint({
      tasks,
      developers: devs,
      sprint_capacity: capacity,
    });
    setResult(res);
  }

  if (!tasks?.length) return null;

  return (
    <div className="card">
      <h2>Sprint Planner</h2>
      <button onClick={handlePlan}>Generate Sprint Plan</button>

      {result && (
        <>
          <h3>Selected Tasks</h3>
          <ul>
            {result.selected_tasks.map((t: Task, idx: number) => (
              <li key={idx}>
                <strong>{t.title}</strong> ({t.effort} pts)
              </li>
            ))}
          </ul>

          <p>
            <strong>Capacity used:</strong> {result.capacity_used}
          </p>
          <p>{result.explanation}</p>
        </>
      )}
    </div>
  );
}
