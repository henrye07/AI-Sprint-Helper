export default function Sidebar({ current, onNavigate }: any) {
  const items = [
    { key: "new", label: "New Meeting" },
    { key: "history", label: "Meetings History" },
    //{ key: "sprintDetails", label: "Sprint Details" },
    { key: "chat", label: "Chatbot" }
  ];

  return (
    <div className="sidebar">
        <h2 className="sidebar-title">AI Sprint Copilot</h2>
        {items.map((item) => (
            <div
            key={item.key}
            className={`sidebar-item ${current === item.key ? "active" : ""}`}
            onClick={() => onNavigate(item.key)}
            >
                {item.label}
            </div>
        ))}
    </div>
  );
}
