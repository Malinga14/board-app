export interface Task {
  id: string;
  title: string;
  type: 'Research' | 'Design' | 'Development' | 'Feedback' | 'Other' | 'UX Research' | 'Interface';
  priority: 'high' | 'medium' | 'low';
  assignees: number;
  comments: number;
  attachments: number;
  dueDate?: string;
  hasImage?: boolean;
  reports?: number;
  views?: number;
  groupCall?: boolean;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}
