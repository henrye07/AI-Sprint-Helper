import { MeetingSummary } from "./types";

const BASE_URL = "http://127.0.0.1:8000"; // FastAPI server

export async function summarizeMeeting(rawText: string) : Promise<MeetingSummary> {
  const res = await fetch(`${BASE_URL}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw_text: rawText }),
  });
  return await res.json();
}

export async function extractTasks(meeting_id: number, summary: string) {
  const res = await fetch(`${BASE_URL}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meeting_id, summary}),
  });
  return await res.json();
}

export async function planSprint(payload: any) {
  const res = await fetch(`${BASE_URL}/sprint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function chat(message: string) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return await res.json();
}

export async function updateTask(taskId: number, payload: any) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function deleteTask(taskId: number) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE"
  });
  return await res.json();
}

export async function updateTaskStatus(taskId: number, status: string) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  return await res.json();
}