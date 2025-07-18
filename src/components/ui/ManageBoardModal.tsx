import React, { useState, useEffect } from 'react';
import { X, Edit2, Users, FileText } from 'lucide-react';
import { Board } from '../../utils/boardStorage';
import { User } from '../../types/board';

// Simple UserAvatar component
const UserAvatar: React.FC<{ user: User; size?: 'sm' | 'md' }> = ({ user, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
  
  return (
    <div className={`${sizeClasses} rounded-full bg-blue-500 flex items-center justify-center text-white font-medium`}>
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
};

interface ManageBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  onUpdateBoard: (boardId: string, updates: Partial<Board>) => void;
  availableUsers: User[];
  initialFocus?: 'title' | 'description' | 'members';
}

const ManageBoardModal: React.FC<ManageBoardModalProps> = ({
  isOpen,
  onClose,
  board,
  onUpdateBoard,
  availableUsers,
  initialFocus = 'title'
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setDescription(board.description || '');
      // Convert board users to User type by adding email field
      const convertedUsers = (board.assignedUsers || []).map(user => ({
        ...user,
        email: `${user.name.toLowerCase().replace(/\s+/g, '.')}@company.com`
      }));
      setAssignedUsers(convertedUsers);
    }
  }, [board]);

  const handleSave = () => {
    if (!board || !title.trim()) return;

    onUpdateBoard(board.id, {
      title: title.trim(),
      description: description.trim(),
      assignedUsers: assignedUsers.map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }))
    });
    onClose();
  };

  const handleUserToggle = (user: User) => {
    setAssignedUsers(prev => {
      const isAssigned = prev.some(u => u.id === user.id);
      if (isAssigned) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen || !board) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Board</h2>
              <p className="text-sm text-gray-600">Edit board details and members</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Board Title */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              <span>Board Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter board title..."
              maxLength={100}
            />
          </div>

          {/* Board Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Edit2 className="w-4 h-4" />
              <span>Description</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter board description..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
          </div>

          {/* Assigned Members */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Users className="w-4 h-4" />
              <span>Assigned Members ({assignedUsers.length})</span>
            </label>

            {/* Currently Assigned Users */}
            {assignedUsers.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Currently Assigned:</p>
                <div className="flex flex-wrap gap-2">
                  {assignedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 bg-blue-50 rounded-full px-3 py-1 border border-blue-200"
                    >
                      <UserAvatar user={user} size="sm" />
                      <span className="text-sm font-medium text-blue-800">{user.name}</span>
                      <button
                        onClick={() => handleUserToggle(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
              placeholder="Search users to assign..."
            />

            {/* Available Users */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchQuery ? 'No users found matching your search' : 'No users available'}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const isAssigned = assignedUsers.some(u => u.id === user.id);
                    return (
                      <div
                        key={user.id}
                        className={`p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                          isAssigned ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        onClick={() => handleUserToggle(user)}
                      >
                        <div className="flex items-center space-x-3">
                          <UserAvatar user={user} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isAssigned 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {isAssigned && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBoardModal;
