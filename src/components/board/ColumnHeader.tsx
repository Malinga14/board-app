import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, UserPlus, FileText } from 'lucide-react';
import { ColumnHeaderProps } from '../../types/board';

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ 
  column, 
  onAddTask, 
  onColumnSettings,
  onAssignUsers,
  isMobile = false 
}) => {
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPlusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAssignMembers = () => {
    setShowPlusDropdown(false);
    onAssignUsers?.(column.id);
  };

  const handleAddTask = () => {
    setShowPlusDropdown(false);
    onAddTask?.(column.id);
  };
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
          <div className="relative" ref={dropdownRef}>
            <button 
              className="p-1 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPlusDropdown(!showPlusDropdown)}
            >
              <Plus className="w-5 h-5" />
            </button>
            {showPlusDropdown && (
              <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleAddTask}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-t-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
                <button
                  onClick={handleAssignMembers}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-b-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Assign Member</span>
                </button>
              </div>
            )}
          </div>
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
        <div className="relative" ref={dropdownRef}>
          <button 
            className="p-1.5 rounded-full transition-colors text-gray-600 hover:text-gray-800"
            onClick={() => setShowPlusDropdown(!showPlusDropdown)}
          >
            <Plus className="w-4 h-4" />
          </button>
          {showPlusDropdown && (
            <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={handleAddTask}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-t-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Add Task</span>
              </button>
              <button
                onClick={handleAssignMembers}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-b-lg"
              >
                <UserPlus className="w-4 h-4" />
                <span>Assign Member</span>
              </button>
            </div>
          )}
        </div>
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
