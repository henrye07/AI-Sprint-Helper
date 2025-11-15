export interface Task {
  title: string;
  description?: string;
  priority: string;
  effort: number;
  tags: string[];
  assignee?: string;
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
  selected_tasks: Task[];
  capacity_used: number;
  explanation: string;
}
