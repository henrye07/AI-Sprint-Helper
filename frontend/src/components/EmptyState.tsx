export function EmptyState({ icon, title, message }: any) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}
