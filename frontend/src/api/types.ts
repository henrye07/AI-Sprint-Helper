export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: string;
  effort: number;
  tags?: string[];
  assignee?: string;
  meeting_id?: number;
  status: string;
}

export interface SprintTask {
  task_id: number;
  title: string;
  priority: string;
  effort: number;
  reason: string;
}

export interface MeetingSummary {
  meeting_id: number;
  summary: string;
  decisions: string[];
  action_items: string[];
}

export interface Developer {
  name: string;
  capacity: number;
}

export interface SprintPlan {
  selected_tasks: SprintTask[];
  capacity_used: number;
  explanation: string;
}

export interface SprintModel {
  id: number;
  name: string;
  created_at: string;
  capacity: number;
  tasks: Task[];
}