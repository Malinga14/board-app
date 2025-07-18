import React from 'react';
import { MoreHorizontal, MessageCircle, Paperclip, Calendar, Eye, PhoneCall, Zap, MessageSquare, Image } from 'lucide-react';
import { TaskCardProps } from '../../types/board';
import mockData from '../../data/mockData.json';

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onTaskClick, 
  onTaskEdit, 
  isMobile = false,
  onDragStart,
  onDragEnd,
  isDragging = false
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research':
        return { dot: 'bg-green-500', text: 'text-gray-700' };
      case 'Design':
        return { dot: 'bg-red-500', text: 'text-gray-700' };
      case 'Development':
        return { dot: 'bg-orange-500', text: 'text-gray-700' };
      case 'Feedback':
        return { dot: 'bg-blue-500', text: 'text-gray-700' };
      case 'UX Research':
        return { dot: 'bg-orange-500', text: 'text-gray-700' };
      case 'Interface':
        return { dot: 'bg-gray-800', text: 'text-gray-700' };
      case 'Presentation':
        return { dot: 'bg-orange-500', text: 'text-gray-700' };
      case 'Other':
        return { dot: 'bg-gray-800', text: 'text-gray-700' };
      default:
        return { dot: 'bg-gray-500', text: 'text-gray-700' };
    }
  };

  const getUserAvatars = (assigneeCount: number) => {
    return mockData.users.slice(0, Math.min(assigneeCount, mockData.users.length));
  };

  const avatars = getUserAvatars(task.assignees);
  const typeColors = getTypeColor(task.type);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    onDragStart?.(task.id, 'unknown'); // Column ID would need to be passed from parent
  };

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd?.();
  };

  // Return single card design that matches the image exactly
  return (
    <div 
      className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer ${
        isDragging ? 'opacity-50 transform rotate-3 scale-105' : ''
      }`}
      onClick={() => onTaskClick?.(task.id)}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Header row with dot + type + menu */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${typeColors.dot}`}></div>
          <span className={`text-sm font-medium ${typeColors.text}`}>
            {task.type}
          </span>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600 p-1"
          onClick={(e) => {
            e.stopPropagation();
            onTaskEdit?.(task.id);
          }}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <h4 className="font-bold text-gray-900 mb-4 text-xl leading-tight">{task.title}</h4>

      {/* Avatar row with priority */}
      <div className="flex items-center justify-between mb-4">
        {/* Multiple overlapping avatars with +2 indicator */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-white flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-white flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800">
              +2
            </div>
          </div>
        </div>
        
        {/* Priority with lightning bolt in gray background */}
        {task.priority && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-gray-100">
            <Zap className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-medium text-gray-700 capitalize">{task.priority}</span>
          </div>
        )}
      </div>

      {/* Image section - only show if hasImage is true */}
      {task.hasImage && (
        <div className="bg-gray-600 rounded-lg h-32 mb-4 flex items-center justify-center">
          <Image className="w-8 h-8 text-white text-opacity-80" />
        </div>
      )}

      {/* Horizontal divider line - always show before bottom stats */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Bottom stats row - exactly 3 icons as shown in image */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-6">
          {/* Paperclip with count - always show */}
          <div className="flex items-center space-x-1.5">
            <Paperclip className="w-4 h-4" />
            <span className="font-medium">{task.attachments || 2}</span>
          </div>
          
          {/* Message/comment with count - always show */}
          <div className="flex items-center space-x-1.5">
            <MessageSquare className="w-4 h-4" />
            <span className="font-medium">{task.comments || 2}</span>
          </div>
        </div>

        {/* Due date with calendar on the right - always show */}
        <div className="flex items-center space-x-1.5 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">Due: {task.dueDate || 'Tomorrow'}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
