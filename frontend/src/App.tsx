import { useState } from "react";
import MeetingInput from "./components/MeetingInput";
import MeetingsHistory from "./components/MeetingsHistory";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";
import SprintDetails from "./components/SprintDetails";

import "./App.css";
import "./components/sidebar.css";
import MeetingDetails from "./components/MeetingDetails";

function App() {
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState("new");
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);

  function openMeetingDetails(meetingId: number) {
    setSelectedMeetingId(meetingId);
    setPage("meetingDetails");
  }

  function openSprintDetails(sprintId: number) {
    setSelectedSprintId(sprintId);
    setPage("sprintDetails");
  }

  return (
    <div className="app-container">
      <Sidebar current={page} onNavigate={setPage} />
      <div className="main-content">
        {page === "new" && <MeetingInput onSummary={setSummary} onTasks={setTasks} />}
        {page === "history" && <MeetingsHistory onOpenMeeting={openMeetingDetails}  />}
        {page === "meetingDetails" && selectedMeetingId !== null && (
          <MeetingDetails
            meetingId={selectedMeetingId}
            onBack={() => setPage("history")}
            onOpenSprint={openSprintDetails}
          />
        )}
        {page === "sprintDetails" && selectedSprintId !== null && (
          <SprintDetails
            sprintId={selectedSprintId}
            onBack={() => setPage("meetingDetails")}
          />
        )}
        {page === "chat" && <Chatbot />}
      </div>
    </div>
  );
}

export default App;
