export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'Research' | 'Design' | 'Development' | 'Feedback' | 'Other' | 'UX Research' | 'Interface' | 'Presentation';
  priority: 'high' | 'medium' | 'low';
  assignees: number;
  assignedUsers?: User[]; // Array of assigned users
  comments: number;
  attachments: number;
  dueDate?: string;
  hasImage?: boolean;
  images?: string[]; // Base64 encoded images
  reports?: number;
  views?: number;
  groupCall?: boolean;
  avatars?: string[];
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export interface BoardHeaderControlsProps {
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

export interface ColumnHeaderProps {
  column: Column;
  onAddTask?: (columnId: string) => void;
  onColumnSettings?: (columnId: string) => void;
  onAssignUsers?: (columnId: string) => void;
  isMobile?: boolean;
  onDrop?: (taskId: string, targetColumnId: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

export interface TaskCardProps {
  task: Task;
  onTaskClick?: (taskId: string) => void;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskAssign?: (taskId: string) => void;
  isMobile?: boolean;
  onDragStart?: (taskId: string, sourceColumnId: string) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}
