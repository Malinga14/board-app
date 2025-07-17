import React from 'react';
import { Plus, MoreHorizontal, MessageCircle, Paperclip, Calendar, Users, Eye, PhoneCall } from 'lucide-react';

interface Task {
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

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const Board = () => {
  const columns: Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-100',
      tasks: [
        {
          id: '1',
          title: 'User interview',
          type: 'Research',
          priority: 'medium',
          assignees: 2,
          comments: 2,
          attachments: 0,
          dueDate: 'Tomorrow'
        },
        {
          id: '2',
          title: 'Design System',
          type: 'Design',
          priority: 'high',
          assignees: 2,
          comments: 8,
          attachments: 3,
          reports: 2
        },
        {
          id: '3',
          title: 'Speech',
          type: 'Other',
          priority: 'low',
          assignees: 2,
          comments: 3,
          attachments: 1
        },
        {
          id: '4',
          title: 'Wireframe',
          type: 'Design',
          priority: 'medium',
          assignees: 2,
          comments: 0,
          attachments: 0,
          hasImage: true
        }
      ]
    },
    {
      id: 'progress',
      title: 'In Progress',
      color: 'bg-orange-400',
      tasks: [
        {
          id: '5',
          title: 'UI Design',
          type: 'Design',
          priority: 'high',
          assignees: 2,
          comments: 2,
          attachments: 2,
          dueDate: 'Tomorrow'
        },
        {
          id: '6',
          title: 'Check Clients Feedback',
          type: 'Feedback',
          priority: 'medium',
          assignees: 4,
          comments: 8,
          attachments: 0,
          hasImage: true,
          dueDate: '22 April, 2022'
        },
        {
          id: '7',
          title: 'Copyright',
          type: 'Development',
          priority: 'low',
          assignees: 1,
          comments: 4,
          attachments: 0,
          dueDate: '22 April, 2022'
        },
        {
          id: '8',
          title: 'Filter sorting',
          type: 'UX Research',
          priority: 'medium',
          assignees: 2,
          comments: 0,
          attachments: 0,
          dueDate: '22 April, 2022'
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
          priority: 'high',
          assignees: 2,
          comments: 243,
          attachments: 35,
          views: 0
        },
        {
          id: '10',
          title: 'Detail Page',
          type: 'Design',
          priority: 'medium',
          assignees: 2,
          comments: 28,
          attachments: 6,
          hasImage: true
        },
        {
          id: '11',
          title: 'Animation preloaders',
          type: 'Interface',
          priority: 'low',
          assignees: 1,
          comments: 9,
          attachments: 4
        },
        {
          id: '12',
          title: 'Sorting category',
          type: 'UX Research',
          priority: 'medium',
          assignees: 3,
          comments: 0,
          attachments: 0
        }
      ]
    },
    {
      id: 'reject',
      title: 'Reject',
      color: 'bg-red-500',
      tasks: [
        {
          id: '13',
          title: 'Group Management',
          type: 'Other',
          priority: 'high',
          assignees: 1,
          comments: 329,
          attachments: 0,
          views: 0,
          groupCall: true
        },
        {
          id: '14',
          title: 'Design System',
          type: 'Design',
          priority: 'medium',
          assignees: 1,
          comments: 8,
          attachments: 3,
          reports: 2
        },
        {
          id: '15',
          title: 'Slider controls',
          type: 'Interface',
          priority: 'low',
          assignees: 2,
          comments: 31,
          attachments: 8
        },
        {
          id: '16',
          title: 'Slider controls',
          type: 'Design',
          priority: 'medium',
          assignees: 2,
          comments: 0,
          attachments: 0,
          hasImage: true
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research':
        return 'bg-green-100 text-green-700';
      case 'Design':
        return 'bg-red-100 text-red-700';
      case 'Development':
        return 'bg-orange-100 text-orange-700';
      case 'Feedback':
        return 'bg-blue-100 text-blue-700';
      case 'UX Research':
        return 'bg-orange-100 text-orange-700';
      case 'Interface':
        return 'bg-blue-100 text-blue-700';
      case 'Other':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden h-full overflow-y-auto">
        <div className="space-y-6">
          {columns.map((column) => (
            <div key={column.id} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 text-lg">{column.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                        {task.type}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-3">{task.title}</h4>

                    {task.hasImage && (
                      <div className="bg-gray-100 rounded-lg h-20 mb-3 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        {task.attachments > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="w-4 h-4" />
                            <span>{task.attachments}</span>
                          </div>
                        )}
                        {task.comments > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{task.comments}</span>
                          </div>
                        )}
                        {task.views !== undefined && (
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{task.views}</span>
                          </div>
                        )}
                        {task.reports && (
                          <div className="flex items-center space-x-1 text-red-500">
                            <span>{task.reports} Reports</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {task.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs">{task.dueDate}</span>
                          </div>
                        )}
                        <div className="flex -space-x-1">
                          {Array.from({ length: task.assignees }).map((_, i) => (
                            <div key={i} className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex space-x-4 h-full overflow-hidden">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
                <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${column.color}`}>
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-full pb-4">
              {column.tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">{task.title}</h4>

                  {task.hasImage && (
                    <div className="bg-gray-800 rounded-lg h-20 mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                      <div className="relative w-8 h-8 bg-white bg-opacity-20 rounded border border-white border-opacity-30 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white bg-opacity-60 rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* Bottom section with icons and stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {task.attachments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{task.attachments}</span>
                        </div>
                      )}
                      {task.comments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{task.comments}</span>
                        </div>
                      )}
                      {task.views !== undefined && task.views >= 0 && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{task.views}</span>
                        </div>
                      )}
                      {task.groupCall && (
                        <div className="flex items-center space-x-1 text-blue-500">
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Group Call</span>
                        </div>
                      )}
                      {task.reports && (
                        <div className="flex items-center space-x-1 text-red-500">
                          <span className="text-xs font-medium">{task.reports} Reports</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {task.dueDate && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{task.dueDate}</span>
                        </div>
                      )}
                      <div className="flex -space-x-1">
                        {Array.from({ length: Math.min(task.assignees, 3) }).map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">{i + 1}</span>
                          </div>
                        ))}
                        {task.assignees > 3 && (
                          <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">+{task.assignees - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
