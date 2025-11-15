import { useState } from "react";
import MeetingInput from "./components/MeetingInput";
import SummaryView from "./components/SummaryView";
import TaskList from "./components/TaskList";
import SprintPlanner from "./components/SprintPlanner";
import Chatbot from "./components/Chatbot";

function App() {
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI Sprint Copilot</h1>

      <MeetingInput onSummary={setSummary} onTasks={setTasks} />
      <SummaryView summary={summary} />
      <TaskList tasks={tasks} />
      <SprintPlanner tasks={tasks} />
      <Chatbot />
    </div>
  );
}

export default App;
