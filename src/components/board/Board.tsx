import React, { useState } from 'react';
import { Column } from '../../types/board';
import { getEnhancedBoardData } from '../../utils/boardData';
import ColumnHeader from './ColumnHeader';
import TaskCard from './TaskCard';
import ManageButton from '../ui/ManageButton';
import { MoreHorizontal } from 'lucide-react';

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(getEnhancedBoardData());
  const [draggedTask, setDraggedTask] = useState<{taskId: string, sourceColumnId: string} | null>(null);

  const handleAddTask = (columnId: string) => {
    // TODO: Implement add task functionality
    console.log('Add task to column:', columnId);
  };

  const handleColumnSettings = (columnId: string) => {
    // TODO: Implement column settings functionality
    console.log('Column settings for:', columnId);
  };

  const handleTaskClick = (taskId: string) => {
    // TODO: Implement task click functionality
    console.log('Task clicked:', taskId);
  };

  const handleTaskEdit = (taskId: string) => {
    // TODO: Implement task edit functionality
    console.log('Edit task:', taskId);
  };

  const handleDragStart = (taskId: string, sourceColumnId: string) => {
    setDraggedTask({ taskId, sourceColumnId });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

    const { taskId, sourceColumnId } = draggedTask;
    
    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find source and target columns
      const sourceColumnIndex = newColumns.findIndex(col => col.id === sourceColumnId);
      const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
      
      if (sourceColumnIndex === -1 || targetColumnIndex === -1) return prevColumns;
      
      // Find and remove task from source column
      const taskIndex = newColumns[sourceColumnIndex].tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prevColumns;
      
      const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);
      
      // Add task to target column
      newColumns[targetColumnIndex].tasks.push(movedTask);
      
      return newColumns;
    });

    setDraggedTask(null);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Project Header Section */}
      <div className="flex-shrink-0 px-8 py-6 bg-white">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-bold text-gray-900">Sport Xi Project</h1>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">In progress</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">event production</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">assigned</span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">+4</div>
                </div>
              </div>
              
              <ManageButton onClick={() => console.log('Manage clicked')} />
              
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">Last updated on 04 April, 2022</p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden h-full overflow-y-auto">
        <div className="space-y-6">
          {columns.map((column) => (
            <div key={column.id} className="w-full bg-white rounded-lg border border-gray-200 p-4">
              <ColumnHeader
                column={column}
                onAddTask={handleAddTask}
                onColumnSettings={handleColumnSettings}
                isMobile={true}
              />

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskClick={handleTaskClick}
                    onTaskEdit={handleTaskEdit}
                    onDragStart={(taskId) => handleDragStart(taskId, column.id)}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedTask?.taskId === task.id}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col h-full overflow-hidden">
        {/* Fixed Headers Row */}
        <div className="flex-shrink-0 flex space-x-4 py-4 bg-white w-full px-8">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-0">
              <ColumnHeader
                column={column}
                onAddTask={handleAddTask}
                onColumnSettings={handleColumnSettings}
              />
            </div>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex space-x-4 min-h-full">
            {columns.map((column) => (
              <div 
                key={column.id} 
                className={`flex-1 min-w-0 ${
                  draggedTask && draggedTask.sourceColumnId !== column.id 
                    ? 'bg-blue-50 bg-opacity-50 border-2 border-dashed border-blue-300 rounded-lg' 
                    : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                <div className="space-y-3 pb-4 p-2">
                  {column.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onTaskClick={handleTaskClick}
                      onTaskEdit={handleTaskEdit}
                      onDragStart={(taskId) => handleDragStart(taskId, column.id)}
                      onDragEnd={handleDragEnd}
                      isDragging={draggedTask?.taskId === task.id}
                    />
                  ))}
                  
                  {/* Drop zone indicator */}
                  {draggedTask && draggedTask.sourceColumnId !== column.id && (
                    <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center text-blue-600 bg-blue-50">
                      Drop task here
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
