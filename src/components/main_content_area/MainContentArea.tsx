import React from 'react';
import { MoreHorizontal, Calendar, Users } from 'lucide-react';

interface MainContentAreaProps {
  children: React.ReactNode;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Project Header */}
      <div className="bg-white border-b border-gray-200 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">Sport Xi Project</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 self-start">
                In progress
              </span>
            </div>
            <p className="text-gray-600 mt-1 text-sm md:text-base">event production</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                <span>assigned</span>
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs">
                    +4
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                <span>Manage</span>
                <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
            
            <div className="text-xs md:text-sm text-gray-500 mt-2">
              Last updated on 04 April, 2022
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default MainContentArea;
