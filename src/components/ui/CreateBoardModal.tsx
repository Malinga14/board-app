import React, { useState } from 'react';
import { X, Plus, User, Check } from 'lucide-react';
import usersData from '../../data/users.json';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (title: string, description: string, assignedUsers: User[]) => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateBoard 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const availableUsers: User[] = usersData;

  const handleUserToggle = (user: User) => {
    setAssignedUsers(prev => {
      const isAssigned = prev.find(u => u.id === user.id);
      if (isAssigned) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      onCreateBoard(title.trim(), description.trim(), assignedUsers);
      setTitle('');
      setDescription('');
      setAssignedUsers([]);
      onClose();
    } catch (error) {
      console.error('Error creating board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setAssignedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Board</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="board-title" className="block text-sm font-medium text-gray-700 mb-2">
                Board Title *
              </label>
              <input
                id="board-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
                required
                maxLength={100}
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="board-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter board description..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isSubmitting}
                maxLength={500}
              />
            </div>

            {/* Assign Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Users
              </label>
              <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                {availableUsers.length > 0 ? (
                  <div className="space-y-2">
                    {availableUsers.map((user) => {
                      const isAssigned = assignedUsers.find(u => u.id === user.id);
                      return (
                        <div
                          key={user.id}
                          onClick={() => handleUserToggle(user)}
                          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            isAssigned 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="relative">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            {isAssigned && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No users available</p>
                  </div>
                )}
              </div>
              {assignedUsers.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600">
                    {assignedUsers.length} user{assignedUsers.length !== 1 ? 's' : ''} assigned
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating...' : 'Create Board'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
