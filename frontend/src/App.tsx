import { useState } from "react";
import MeetingInput from "./components/MeetingInput";
import MeetingsHistory from "./components/MeetingsHistory";
import SummaryView from "./components/SummaryView";
import TaskList from "./components/TaskList";
import SprintPlanner from "./components/SprintPlanner";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";

import "./App.css";
import "./components/sidebar.css";

function App() {
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState("new");

  return (
    <div className="app-container">
      <Sidebar current={page} onNavigate={setPage} />
      <div className="main-content">
        {page === "new" && <MeetingInput onSummary={setSummary} onTasks={setTasks} />}
        {page === "history" && <MeetingsHistory />}
        {page === "sprint" && <SprintPlanner tasks={tasks} />}
        {page === "chat" && <Chatbot />}
      </div>
    </div>
  );
}

export default App;
