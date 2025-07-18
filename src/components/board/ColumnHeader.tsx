import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { ColumnHeaderProps } from '../../types/board';

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ 
  column, 
  onAddTask, 
  onColumnSettings,
  isMobile = false 
}) => {
  // Get the styling based on column title to match the image exactly
  const getColumnStyling = (title: string) => {
    switch (title) {
      case 'To Do':
        return {
          bg: 'bg-gray-400',
          text: 'text-black',
          button: 'text-black hover:text-gray-700'
        };
      case 'In Progress':
        return {
          bg: 'bg-[#FFA800]',
          text: 'text-black',
          button: 'text-black hover:text-gray-700'
        };
      case 'Approved':
        return {
          bg: 'bg-[#AEE753]',
          text: 'text-black',
          button: 'text-black hover:text-gray-700'
        };
      case 'Reject':
        return {
          bg: 'bg-[#F90430]',
          text: 'text-black',
          button: 'text-black hover:text-gray-700'
        };
      default:
        return {
          bg: 'bg-gray-400',
          text: 'text-black',
          button: 'text-black hover:text-gray-700'
        };
    }
  };

  const styling = getColumnStyling(column.title);

  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-4 px-4 py-3">
        <h3 className={`font-bold text-lg px-5 py-2.5 rounded-full shadow-sm ${styling.bg} ${styling.text}`}>{column.title}</h3>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 text-gray-600 hover:text-gray-800"
            onClick={() => onAddTask?.(column.id)}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            className="p-1 text-gray-600 hover:text-gray-800"
            onClick={() => onColumnSettings?.(column.id)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop version - clean design with prominent colored pills
  return (
    <div className="flex items-center justify-between mb-6 px-5 py-4">
      <h3 className={`font-bold text-base px-6 py-3 rounded-full shadow-sm ${styling.bg} ${styling.text}`}>{column.title}</h3>
      <div className="flex items-center space-x-1">
        <button 
          className="p-1.5 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          onClick={() => onAddTask?.(column.id)}
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          onClick={() => onColumnSettings?.(column.id)}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ColumnHeader;
