import { Column, Task } from '../types/board';
import mockData from '../data/mockData.json';

export const transformMockDataToBoard = (): Column[] => {
  const board = mockData.boards[0]; // Get the first board
  
  return board.columns.map(column => ({
    id: column.id,
    title: column.title,
    color: getColumnColorClass(column.color),
    tasks: column.tasks.map(task => ({
      id: task.id,
      title: task.title,
      type: mapCategoryToType(task.tags?.[0] || 'other'),
      priority: task.priority as 'high' | 'medium' | 'low',
      assignees: task.assignee ? 1 : 0,
      comments: task.comments?.length || 0,
      attachments: 0, // Not in mock data, using default
      dueDate: task.dueDate ? formatDate(task.dueDate) : undefined,
      hasImage: !!task.imageUrl,
      reports: 0, // Not in mock data, using default
      views: 0, // Not in mock data, using default
      groupCall: false, // Not in mock data, using default
      avatars: task.assignee ? [task.assignee.avatar] : []
    }))
  }));
};

const getColumnColorClass = (hexColor: string): string => {
  // Map hex colors to Tailwind classes
  const colorMap: { [key: string]: string } = {
    '#e5e7eb': 'bg-gray-100',
    '#fef3c7': 'bg-orange-400',
    '#dbeafe': 'bg-green-500',
    '#dcfce7': 'bg-red-500'
  };
  
  return colorMap[hexColor] || 'bg-gray-100';
};

const mapCategoryToType = (category: string): 'Research' | 'Design' | 'Development' | 'Feedback' | 'Other' | 'UX Research' | 'Interface' => {
  const categoryMap: { [key: string]: 'Research' | 'Design' | 'Development' | 'Feedback' | 'Other' | 'UX Research' | 'Interface' } = {
    'research': 'Research',
    'ux': 'UX Research',
    'design': 'Design',
    'ui': 'Interface',
    'backend': 'Development',
    'api': 'Development',
    'feedback': 'Feedback',
    'client-review': 'Feedback',
    'presentation': 'Other',
    'testing': 'Other'
  };
  
  return categoryMap[category] || 'Other';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
};

// Enhanced mock data with additional tasks for better representation
export const getEnhancedBoardData = (): Column[] => {
  return [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-200',
      tasks: [
        {
          id: '1',
          title: 'User interview',
          type: 'Research',
          priority: 'low',
          assignees: 1,
          comments: 2,
          attachments: 2,
          dueDate: 'Tomorrow',
          hasImage: false,
          avatars: mockData.users.slice(0, 1).map(u => u.avatar)
        },
        {
          id: '2',
          title: 'Design System',
          type: 'Design',
          priority: 'medium',
          assignees: 2,
          comments: 8,
          attachments: 3,
          reports: 2,
          hasImage: false,
          avatars: mockData.users.slice(0, 2).map(u => u.avatar)
        },
        {
          id: '3',
          title: 'Speech',
          type: 'Other',
          priority: 'low',
          assignees: 3,
          comments: 3,
          attachments: 1,
          hasImage: false,
          avatars: mockData.users.slice(0, 3).map(u => u.avatar)
        },
        {
          id: '4',
          title: 'Wireframe',
          type: 'Design',
          priority: 'high',
          assignees: 3,
          comments: 0,
          attachments: 0,
          hasImage: true,
          avatars: mockData.users.slice(0, 3).map(u => u.avatar)
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-orange-400',
      tasks: [
        {
          id: '5',
          title: 'UI Design',
          type: 'Design',
          priority: 'high',
          assignees: 3,
          comments: 2,
          attachments: 2,
          dueDate: 'Tomorrow',
          hasImage: false,
          avatars: mockData.users.slice(1, 4).map(u => u.avatar)
        },
        {
          id: '6',
          title: 'Check Clients Feedback',
          type: 'Feedback',
          priority: 'low',
          assignees: 4,
          comments: 8,
          attachments: 0,
          dueDate: '22 April, 2022',
          hasImage: true,
          avatars: mockData.users.slice(0, 4).map(u => u.avatar)
        },
        {
          id: '7',
          title: 'Copyright',
          type: 'Presentation',
          priority: 'low',
          assignees: 1,
          comments: 4,
          attachments: 0,
          dueDate: '22 April, 2022',
          hasImage: false,
          avatars: mockData.users.slice(2, 3).map(u => u.avatar)
        },
        {
          id: '8',
          title: 'Filter sorting',
          type: 'UX Research',
          priority: 'low',
          assignees: 2,
          comments: 0,
          attachments: 0,
          hasImage: false,
          avatars: mockData.users.slice(0, 2).map(u => u.avatar)
        }
      ]
    },
    {
      id: 'approved',
      title: 'Approved',
      color: 'bg-green-500',
      tasks: [
        {
          id: '9',
          title: 'Prototype',
          type: 'Research',
          priority: 'low',
          assignees: 4,
          comments: 243,
          attachments: 35,
          hasImage: false,
          avatars: mockData.users.slice(0, 4).map(u => u.avatar)
        },
        {
          id: '10',
          title: 'Detail Page',
          type: 'Design',
          priority: 'low',
          assignees: 4,
          comments: 28,
          attachments: 6,
          hasImage: true,
          avatars: mockData.users.slice(1, 5).map(u => u.avatar)
        },
        {
          id: '11',
          title: 'Animation preloaders',
          type: 'Interface',
          priority: 'high',
          assignees: 1,
          comments: 9,
          attachments: 2,
          hasImage: false,
          avatars: mockData.users.slice(0, 1).map(u => u.avatar)
        }
      ]
    },
    {
      id: 'reject',
      title: 'Reject',
      color: 'bg-red-500',
      tasks: [
        {
          id: '12',
          title: 'Bug fixes',
          type: 'Development',
          priority: 'high',
          assignees: 2,
          comments: 15,
          attachments: 4,
          dueDate: 'Today',
          hasImage: false,
          avatars: mockData.users.slice(2, 4).map(u => u.avatar)
        },
        {
          id: '13',
          title: 'Code review',
          type: 'Development',
          priority: 'medium',
          assignees: 1,
          comments: 5,
          attachments: 1,
          dueDate: 'Tomorrow',
          hasImage: false,
          avatars: mockData.users.slice(3, 4).map(u => u.avatar)
        }
      ]
    }
  ];
};
