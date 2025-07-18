import React, { useState, useEffect } from 'react';
import { X, UserPlus, Check } from 'lucide-react';
import { User, Task } from '../../types/board';
import usersData from '../../data/users.json';

interface AssignUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignUsers: (taskId: string, users: User[]) => void;
  task: Task | null;
}

const AssignUserModal: React.FC<AssignUserModalProps> = ({
  isOpen,
  onClose,
  onAssignUsers,
  task,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const allUsers: User[] = usersData as User[];

  // Initialize selected users when task changes
  useEffect(() => {
    if (isOpen && task) {
      setSelectedUsers(task.assignedUsers || []);
    }
  }, [isOpen, task]);

  // Filter users based on search term
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserToggle = (user: User) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task) return;

    setIsSubmitting(true);
    
    try {
      onAssignUsers(task.id, selectedUsers);
      handleClose();
    } catch (error) {
      console.error('Error assigning users:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSearchTerm('');
    setIsSubmitting(false);
    onClose();
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isSubmitting) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting]);

  if (!isOpen || !task) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Assign Users to Task
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Task Info */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-500">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} assigned
            </p>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Users List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredUsers.map((user) => {
                const isSelected = selectedUsers.some(u => u.id === user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => handleUserToggle(user)}
                    disabled={isSubmitting}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                );
              })}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedUsers.length} selected
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? 'Assigning...' : 'Assign Users'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUserModal;
