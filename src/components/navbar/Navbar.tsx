import React from 'react';
import { Search, Plus, Image, Bell, SlidersHorizontal, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const hasUnreadNotifications = true;

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-3 md:px-4 py-3 md:py-4 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Mobile menu + Logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src="/logo.png" 
              alt="Board App Logo" 
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
            <span className="text-base md:text-lg font-semibold text-gray-800 hidden xs:block">Board App</span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Create button - Hidden on mobile */}
          <button className="hidden lg:flex items-center space-x-2 bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base">
            <Plus className="w-4 h-4" />
            <span>Create new board</span>
          </button>
          
          {/* Mobile create button */}
          <button className="lg:hidden p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          
          {/* Search bar - Responsive width */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-32 sm:w-48 md:w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500 text-sm md:text-base"
            />
          </div>
          
          {/* Mobile search button */}
          <button className="sm:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-4 h-4" />
          </button>
          
          {/* Action buttons */}
          <button className="hidden md:block p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            {hasUnreadNotifications && (
              <div className="absolute top-1.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </button>
            
          <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
            <Image className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
