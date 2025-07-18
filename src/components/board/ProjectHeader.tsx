import React, { useState } from 'react';
import { Edit3, Users } from 'lucide-react';
import ManageButton from '../ui/ManageButton';

interface ProjectHeaderProps {
  project: {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Approved' | 'Reject';
    assignedUsers: Array<{
      id: string;
      name: string;
      avatar: string;
    }>;
    lastUpdated: string;
  };
  onProjectUpdate: (projectId: string, updates: any) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, onProjectUpdate }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const getStatusStyling = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-400 text-black';
      case 'In Progress':
        return 'bg-[#FFA800] text-black';
      case 'Approved':
        return 'bg-[#AEE753] text-black';
      case 'Reject':
        return 'bg-[#F90430] text-black';
      default:
        return 'bg-gray-400 text-black';
    }
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    onProjectUpdate(project.id, { title });
  };

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    onProjectUpdate(project.id, { description });
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
    if (e.key === 'Escape') {
      setTitle(project.title);
      setIsEditingTitle(false);
    }
  };

  const handleDescriptionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDescriptionSave();
    }
    if (e.key === 'Escape') {
      setDescription(project.description);
      setIsEditingDescription(false);
    }
  };

  // Display first 3 users
  const displayUsers = project.assignedUsers.slice(0, 3);
  const remainingCount = project.assignedUsers.length - displayUsers.length;

  return (
    <div className="bg-white p-6 border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title and Status */}
          <div className="flex items-center gap-3 mb-2">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyPress}
                className="text-xl font-bold bg-transparent border-b-2 border-blue-500 outline-none"
                autoFocus
              />
            ) : (
              <h1 
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h1>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyling(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Description */}
          <div className="mb-4">
            {isEditingDescription ? (
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionSave}
                onKeyDown={handleDescriptionKeyPress}
                className="text-gray-600 bg-transparent border-b-2 border-blue-500 outline-none"
                autoFocus
              />
            ) : (
              <p 
                className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsEditingDescription(true)}
              >
                {description}
              </p>
            )}
          </div>

          {/* Assigned Users */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-500">assigned</span>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {displayUsers.map((user, index) => (
                  <img
                    key={user.id}
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                    title={user.name}
                    style={{ zIndex: displayUsers.length - index }}
                  />
                ))}
                {remainingCount > 0 && (
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
                    style={{ zIndex: 0 }}
                  >
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-400">
            Last updated on: {project.lastUpdated}
          </div>
        </div>

        {/* Manage Button */}
        <div className="flex flex-col items-end">
          <ManageButton onClick={() => console.log('Manage clicked')} />
          <div className="w-full h-px bg-gray-300 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
