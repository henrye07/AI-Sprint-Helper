import { useState } from "react";
import MeetingInput from "./components/MeetingInput";
import MeetingsHistory from "./components/MeetingsHistory";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";
import SprintDetails from "./components/SprintDetails";

import "./App.css";
import "./styles/button.css";
import "./styles/layout.css";
import "./styles/global.css";
import "./styles/modal.css";
import "./styles/meetings.css";
import "./styles/meetingDetails.css";
import "./styles/sidebar.css";
import "./styles/toast.css";
import "./styles/emptyState.css";

import MeetingDetails from "./components/MeetingDetails";
import { Toast } from "./components/Toast";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState("new");
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  function openMeetingDetails(meetingId: number) {
    setSelectedMeetingId(meetingId);
    setPage("meetingDetails");
  }

  function showToast(msg: string) {
  setToast(msg);
  setTimeout(() => setToast(""), 3000);
}

  function openSprintDetails(sprintId: number) {
    setSelectedSprintId(sprintId);
    setPage("sprintDetails");
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Toast message={toast} />
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
  </ErrorBoundary>

  );
}

export default App;
