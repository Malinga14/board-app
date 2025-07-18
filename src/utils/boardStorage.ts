// Board management utilities with localStorage
import { Column, Task } from '../types/board';
import mockData from '../data/mockData.json';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Approved' | 'Rejected';
  assignedUsers: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  lastUpdated: string;
  createdAt: string;
  columns: Column[];
}

const BOARDS_STORAGE_KEY = 'board-app-boards';
const ACTIVE_BOARD_KEY = 'board-app-active-board';

// Convert mockData task to Board task format
const convertMockTask = (mockTask: any): Task => {
  // Map mockData tags to valid Task types
  const getTaskType = (tags: string[]): Task['type'] => {
    if (!tags || tags.length === 0) return 'Other';
    const tag = tags[0].toLowerCase();
    
    switch (tag) {
      case 'design': return 'Design';
      case 'research': return 'Research';
      case 'development': return 'Development';
      case 'documentation': return 'Other';
      case 'feedback': return 'Feedback';
      case 'ux research': return 'UX Research';
      case 'interface': return 'Interface';
      case 'presentation': return 'Presentation';
      default: return 'Other';
    }
  };

  // Find the user avatar from mockData users
  const getUserAvatar = (assigneeId: string): string => {
    const user = mockData.users.find(u => u.id === assigneeId);
    return user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`;
  };

  return {
    id: mockTask.id,
    title: mockTask.title,
    type: getTaskType(mockTask.tags),
    priority: mockTask.priority,
    assignees: 1, // mockData has assignee object, we convert to count
    comments: mockTask.comments?.length || 0,
    attachments: mockTask.imageUrl ? 1 : 0,
    dueDate: mockTask.dueDate,
    hasImage: !!mockTask.imageUrl,
    avatars: mockTask.assignee ? [getUserAvatar(mockTask.assignee.id)] : []
  };
};

// Convert mockData board to Board format
const convertMockDataToBoard = (): Board => {
  const mockBoard = mockData.boards[0]; // Get the Sport Xi Project
  return {
    id: `board-${Date.now()}`, // Generate new ID for localStorage
    title: mockBoard.title,
    description: mockBoard.description,
    status: 'In Progress',
    assignedUsers: mockData.users.slice(0, 4).map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar
    })),
    lastUpdated: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    }),
    createdAt: new Date().toISOString(),
    columns: mockBoard.columns.map(column => ({
      id: column.id,
      title: column.title,
      color: column.color,
      tasks: column.tasks.map(convertMockTask)
    }))
  };
};

// Default board template
const createDefaultBoard = (title: string, description: string, assignedUsers: any[] = []): Board => ({
  id: `board-${Date.now()}`,
  title,
  description,
  status: 'In Progress',
  assignedUsers: assignedUsers.map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar
  })),
  lastUpdated: new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  }),
  createdAt: new Date().toISOString(),
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      color: '#6B7280',
      tasks: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#FFA800',
      tasks: []
    },
    {
      id: 'approved',
      title: 'Approved',
      color: '#AEE753',
      tasks: []
    },
    {
      id: 'rejected',
      title: 'Rejected',
      color: '#F90430',
      tasks: []
    }
  ]
});

// Get all boards from localStorage
export const getBoards = (): Board[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(BOARDS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading boards from localStorage:', error);
    return [];
  }
};

// Save boards to localStorage
export const saveBoards = (boards: Board[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(BOARDS_STORAGE_KEY, JSON.stringify(boards));
  } catch (error) {
    console.error('Error saving boards to localStorage:', error);
  }
};

// Create a new board
export const createBoard = (title: string, description: string, assignedUsers: any[] = []): Board => {
  const newBoard = createDefaultBoard(title, description, assignedUsers);
  const boards = getBoards();
  boards.push(newBoard);
  saveBoards(boards);
  return newBoard;
};

// Get a specific board by ID
export const getBoard = (boardId: string): Board | null => {
  const boards = getBoards();
  return boards.find(board => board.id === boardId) || null;
};

// Update a board
export const updateBoard = (boardId: string, updates: Partial<Board>): void => {
  const boards = getBoards();
  const boardIndex = boards.findIndex(board => board.id === boardId);
  
  if (boardIndex !== -1) {
    boards[boardIndex] = { 
      ...boards[boardIndex], 
      ...updates, 
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
      })
    };
    saveBoards(boards);
  }
};

// Delete a board
export const deleteBoard = (boardId: string): void => {
  const boards = getBoards();
  const filteredBoards = boards.filter(board => board.id !== boardId);
  saveBoards(filteredBoards);
};

// Get active board ID
export const getActiveBoardId = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(ACTIVE_BOARD_KEY);
  } catch (error) {
    console.error('Error reading active board from localStorage:', error);
    return null;
  }
};

// Set active board ID
export const setActiveBoardId = (boardId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ACTIVE_BOARD_KEY, boardId);
  } catch (error) {
    console.error('Error saving active board to localStorage:', error);
  }
};

// Initialize with default board if no boards exist
export const initializeBoards = (): Board[] => {
  const boards = getBoards();
  
  if (boards.length === 0) {
    // Create Sport Xi Project from mockData
    const defaultBoard = convertMockDataToBoard();
    
    saveBoards([defaultBoard]);
    setActiveBoardId(defaultBoard.id);
    return [defaultBoard];
  }
  
  return boards;
};

// Add a task to a specific column in a board
export const addTaskToBoard = (boardId: string, columnId: string, task: Omit<Task, 'id'>): Task => {
  const boards = getBoards();
  const boardIndex = boards.findIndex(board => board.id === boardId);
  
  if (boardIndex !== -1) {
    const board = boards[boardIndex];
    const columnIndex = board.columns.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...task
      };
      
      board.columns[columnIndex].tasks.push(newTask);
      board.lastUpdated = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
      });
      
      saveBoards(boards);
      return newTask;
    }
  }
  
  throw new Error('Board or column not found');
};

// Delete a task from a board
export const deleteTaskFromBoard = (boardId: string, taskId: string): boolean => {
  const boards = getBoards();
  const boardIndex = boards.findIndex(board => board.id === boardId);
  
  if (boardIndex !== -1) {
    const board = boards[boardIndex];
    
    // Find the task in any column
    for (let columnIndex = 0; columnIndex < board.columns.length; columnIndex++) {
      const taskIndex = board.columns[columnIndex].tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Remove the task
        board.columns[columnIndex].tasks.splice(taskIndex, 1);
        board.lastUpdated = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        });
        
        saveBoards(boards);
        return true;
      }
    }
  }
  
  return false;
};

// Update a task in a board
export const updateTaskInBoard = (boardId: string, taskId: string, updates: Partial<Task>): boolean => {
  const boards = getBoards();
  const boardIndex = boards.findIndex(board => board.id === boardId);
  
  if (boardIndex !== -1) {
    const board = boards[boardIndex];
    
    // Find the task in any column
    for (let columnIndex = 0; columnIndex < board.columns.length; columnIndex++) {
      const taskIndex = board.columns[columnIndex].tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Update the task
        board.columns[columnIndex].tasks[taskIndex] = {
          ...board.columns[columnIndex].tasks[taskIndex],
          ...updates
        };
        
        board.lastUpdated = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        });
        
        saveBoards(boards);
        return true;
      }
    }
  }
  
  return false;
};

// Assign users to a task
export const assignUsersToTask = (boardId: string, taskId: string, users: any[]): boolean => {
  const boards = getBoards();
  const boardIndex = boards.findIndex(board => board.id === boardId);
  
  if (boardIndex !== -1) {
    const board = boards[boardIndex];
    
    // Find the task in any column
    for (let columnIndex = 0; columnIndex < board.columns.length; columnIndex++) {
      const taskIndex = board.columns[columnIndex].tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Update the task with assigned users
        board.columns[columnIndex].tasks[taskIndex].assignedUsers = users;
        board.columns[columnIndex].tasks[taskIndex].assignees = users.length;
        
        board.lastUpdated = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        });
        
        saveBoards(boards);
        return true;
      }
    }
  }
  
  return false;
};

// Clear all boards and reinitialize with mockData (useful for development/reset)
export const resetToMockData = (): Board[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    localStorage.removeItem(BOARDS_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_BOARD_KEY);
    return initializeBoards();
  } catch (error) {
    console.error('Error resetting to mock data:', error);
    return [];
  }
};
