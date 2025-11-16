export function formatStatus(status: string) {
  switch (status) {
    case "todo": return "To Do";
    case "in_progress": return "In Progress";
    case "done": return "Done";
    default: return status;
  }
}
