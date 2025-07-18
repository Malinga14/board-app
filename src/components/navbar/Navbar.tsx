import React, { useState } from 'react';
import { Search, Plus, Image, Bell, SlidersHorizontal, Menu } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import CreateBoardModal from '../ui/CreateBoardModal';

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { createBoard, searchQuery, setSearchQuery } = useAppStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // This would typically come from your state management or props
  const hasUnreadNotifications = true; // Set to false to hide the dot

  const handleCreateBoard = (title: string, description: string, assignedUsers: any[]) => {
    createBoard(title, description, assignedUsers);
    setIsCreateModalOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block w-full bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Board App Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-semibold text-gray-800">Board App</span>
          </div>

          {/* Right side - Create button, search bar, notification icons and user profile */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create new board</span>
            </button>
            
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
              />
            </div>
            
            {/* Notification and Settings Icons */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {hasUnreadNotifications && (
                <div className="absolute top-1.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
              
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden w-full bg-white border-b border-gray-200">
        {/* Top row - Logo and Menu */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMenuClick}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <img 
              src="/logo.png" 
              alt="Board App Logo" 
              className="w-6 h-6 object-contain"
            />
            <span className="text-base font-semibold text-gray-800">Board App</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {hasUnreadNotifications && (
                <div className="absolute top-1.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
            
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Bottom row - Search and Create button */}
        <div className="flex items-center space-x-3 px-4 pb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
            />
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </nav>
      
      {/* Create Board Modal */}
      <CreateBoardModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </>
  );
};

export default Navbar;
