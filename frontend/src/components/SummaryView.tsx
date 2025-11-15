export default function SummaryView({ summary }: any) {
  if (!summary) return null;

  return (
    <div className="card">
      <h2>Meeting Summary</h2>
      <p>{summary.summary}</p>

      <h3>Decisions</h3>
      <ul>
        {summary.decisions?.map((d: string, idx: number) => (
          <li key={idx}>{d}</li>
        ))}
      </ul>

      <h3>Action Items</h3>
      <ul>
        {summary.action_items?.map((a: string, idx: number) => (
          <li key={idx}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
