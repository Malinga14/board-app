import React, { useState, useEffect } from 'react';
import { Column, Task, User } from '../../types/board';
import ColumnHeader from './ColumnHeader';
import TaskCard from './TaskCard';
import ManageButton from '../ui/ManageButton';
import ManageBoardModal from '../ui/ManageBoardModal';
import AddTaskModal from '../ui/AddTaskModal';
import EditTaskModal from '../ui/EditTaskModal';
import AssignUserModal from '../ui/AssignUserModal';
import { MoreHorizontal } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { addTaskToBoard, deleteTaskFromBoard, updateTaskInBoard, assignUsersToTask, updateBoard } from '../../utils/boardStorage';
import boardData from '../../data/boardData.json';
import users from '../../data/users.json';

const Board: React.FC = () => {
  const { currentBoard, refreshBoards, searchQuery } = useAppStore();
  const [columns, setColumns] = useState<Column[]>([]);
  const [project, setProject] = useState<any>(null);
  const [draggedTask, setDraggedTask] = useState<{taskId: string, sourceColumnId: string} | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);
  const [isManageBoardModalOpen, setIsManageBoardModalOpen] = useState(false);
  const [manageBoardFocus, setManageBoardFocus] = useState<'title' | 'description' | 'members'>('title');
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Load data from current board or fallback to JSON file
  useEffect(() => {
    if (currentBoard) {
      // Use data from localStorage/current board
      setColumns(currentBoard.columns || []);
      setProject(currentBoard);
    } else {
      // Fallback to static JSON data
      setColumns(boardData.columns as Column[]);
      setProject(boardData.board);
    }
  }, [currentBoard]);

  // Simple search filter function
  const filterTasks = (tasks: Task[]) => {
    if (!searchQuery) return tasks;
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddTask = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      setSelectedColumnId(columnId);
      setSelectedColumnTitle(column.title);
      setIsAddTaskModalOpen(true);
    }
  };

  const handleTaskAdded = async (task: Omit<Task, 'id'>) => {
    if (!currentBoard) return;
    
    try {
      const newTask = addTaskToBoard(currentBoard.id, selectedColumnId, task);
      
      // Update local state
      setColumns(prevColumns => 
        prevColumns.map(col => 
          col.id === selectedColumnId 
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
      
      // Refresh the boards in context to sync with localStorage
      refreshBoards();
      
    } catch (error) {
      console.error('Error adding task:', error);
    }
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
    // Find the task to edit
    let taskToEdit: Task | null = null;
    
    for (const column of columns) {
      const foundTask = column.tasks.find(task => task.id === taskId);
      if (foundTask) {
        taskToEdit = foundTask;
        break;
      }
    }
    
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setIsEditTaskModalOpen(true);
    }
  };

  const handleTaskAssign = (taskId: string) => {
    // Find the task to assign users to
    let taskToAssign: Task | null = null;
    
    for (const column of columns) {
      const foundTask = column.tasks.find(task => task.id === taskId);
      if (foundTask) {
        taskToAssign = foundTask;
        break;
      }
    }
    
    if (taskToAssign) {
      setSelectedTask(taskToAssign);
      setIsAssignUserModalOpen(true);
    }
  };

  const handleAssignUsers = async (taskId: string, users: User[]) => {
    if (!currentBoard) return;
    
    try {
      const success = assignUsersToTask(currentBoard.id, taskId, users);
      
      if (success) {
        // Update local state
        setColumns(prevColumns => 
          prevColumns.map(column => ({
            ...column,
            tasks: column.tasks.map(task => 
              task.id === taskId 
                ? { 
                    ...task, 
                    assignedUsers: users,
                    assignees: users.length 
                  } 
                : task
            )
          }))
        );
        
        // Refresh boards context
        refreshBoards();
        console.log('Users assigned successfully:', taskId, users);
      } else {
        console.error('Failed to assign users');
      }
    } catch (error) {
      console.error('Error assigning users:', error);
    }
  };

  const handleAssignUsersToColumn = (columnId: string) => {
    // Open assign user modal for the column - this could be used to assign default users to new tasks in this column
    // Create a mock task object for the column assignment
    const mockTask: Task = {
      id: `column-${columnId}`,
      title: `Assign users to ${columns.find(c => c.id === columnId)?.title || 'column'}`,
      type: 'Other',
      priority: 'medium',
      assignees: 0,
      assignedUsers: [],
      comments: 0,
      attachments: 0
    };
    setSelectedTask(mockTask);
    setIsAssignUserModalOpen(true);
  };

  const handleManageBoard = () => {
    setManageBoardFocus('title');
    setIsManageBoardModalOpen(true);
  };

  const handleEditTitle = () => {
    setManageBoardFocus('title');
    setIsManageBoardModalOpen(true);
  };

  const handleEditDescription = () => {
    setManageBoardFocus('description');
    setIsManageBoardModalOpen(true);
  };

  const handleManageMembers = () => {
    setManageBoardFocus('members');
    setIsManageBoardModalOpen(true);
  };

  const handleUpdateBoard = (boardId: string, updates: Partial<any>) => {
    try {
      updateBoard(boardId, updates);
      refreshBoards();
      console.log('Board updated successfully:', boardId, updates);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    if (!currentBoard) return;
    
    try {
      const success = updateTaskInBoard(currentBoard.id, taskId, updates);
      
      if (success) {
        // Update local state
        setColumns(prevColumns => 
          prevColumns.map(column => ({
            ...column,
            tasks: column.tasks.map(task => 
              task.id === taskId ? { ...task, ...updates } : task
            )
          }))
        );
        
        // Refresh boards context
        refreshBoards();
        console.log('Task updated successfully:', taskId);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!currentBoard) return;
    
    try {
      const success = deleteTaskFromBoard(currentBoard.id, taskId);
      
      if (success) {
        // Update local state - remove task from columns
        setColumns(prevColumns => 
          prevColumns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          }))
        );
        
        // Refresh boards context
        refreshBoards();
        console.log('Task deleted successfully:', taskId);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
    <div className="flex flex-col h-full w-full">
      {/* Project Header Section */}
      <div className="flex-shrink-0 px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 bg-white border-b border-gray-200">
        {project && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{project.title}</h1>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full font-medium w-fit">{project.status}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">assigned</span>
                  <div className="flex -space-x-2">
                    {project.assignedUsers.slice(0, 3).map((user: any, index: number) => (
                      <div key={user.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {project.assignedUsers.length > 3 && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                        +{project.assignedUsers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <ManageButton 
                  onClick={handleManageBoard}
                  onEditTitle={handleEditTitle}
                  onEditDescription={handleEditDescription}
                  onManageMembers={handleManageMembers}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">Last updated on {project.lastUpdated}</p>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="space-y-4 sm:space-y-6">
          {columns.map((column) => (
            <div key={column.id} className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
              <ColumnHeader
                column={column}
                onAddTask={handleAddTask}
                onColumnSettings={handleColumnSettings}
                onAssignUsers={handleAssignUsersToColumn}
                isMobile={true}
              />

              <div className="space-y-3">
                {filterTasks(column.tasks).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskClick={handleTaskClick}
                    onTaskEdit={handleTaskEdit}
                    onTaskDelete={handleTaskDelete}
                    onTaskAssign={handleTaskAssign}
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
      <div className="hidden md:flex flex-col flex-1 overflow-hidden">
        {/* Fixed Headers Row */}
        <div className="flex-shrink-0 flex space-x-4 py-4 bg-white border-b border-gray-100 px-4 md:px-8">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-0">
              <ColumnHeader
                column={column}
                onAddTask={handleAddTask}
                onColumnSettings={handleColumnSettings}
                onAssignUsers={handleAssignUsersToColumn}
              />
            </div>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <div className="h-full overflow-y-auto">
            <div className="flex space-x-4 min-h-full p-4 md:px-8 pb-8">
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
                  <div className="space-y-3 min-h-64">
                    {filterTasks(column.tasks).map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onTaskClick={handleTaskClick}
                        onTaskEdit={handleTaskEdit}
                        onTaskDelete={handleTaskDelete}
                        onTaskAssign={handleTaskAssign}
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
      
      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleTaskAdded}
        columnTitle={selectedColumnTitle}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => {
          setIsEditTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdateTask={handleTaskUpdate}
        task={selectedTask}
      />

      {/* Assign User Modal */}
      <AssignUserModal
        isOpen={isAssignUserModalOpen}
        onClose={() => {
          setIsAssignUserModalOpen(false);
          setSelectedTask(null);
        }}
        onAssignUsers={handleAssignUsers}
        task={selectedTask}
      />

      {/* Manage Board Modal */}
      <ManageBoardModal
        isOpen={isManageBoardModalOpen}
        onClose={() => setIsManageBoardModalOpen(false)}
        board={currentBoard}
        onUpdateBoard={handleUpdateBoard}
        availableUsers={users}
        initialFocus={manageBoardFocus}
      />
    </div>
  );
};

export default Board;
