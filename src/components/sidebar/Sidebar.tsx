"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Folder, 
  MessageCircle, 
  Calendar, 
  Users, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [isBoardsOpen, setIsBoardsOpen] = useState(true);
  const { activeContent, setActiveContent, activeBoardId, setActiveBoardId, boards } = useAppContext();

  const toggleBoards = () => {
    setIsBoardsOpen(!isBoardsOpen);
  };

  const handleNavigation = (content: any) => {
    setActiveContent(content);
    if (onClose) {
      onClose(); // Close sidebar on mobile after navigation
    }
  };

  const handleBoardSelect = (boardId: string) => {
    setActiveBoardId(boardId);
    setActiveContent('boards');
    if (onClose) {
      onClose(); // Close sidebar on mobile after navigation
    }
  };

  return (
    <div className="w-56 md:w-56 lg:w-60 xl:w-64 bg-white flex flex-col h-full border-r border-gray-200">
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-end p-4 border-b border-gray-200">
        <button 
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 md:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-base">P</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">workspace</div>
                <div className="text-sm md:text-base font-medium text-gray-900 truncate">Root folder</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 md:px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-sm md:text-base transition-colors ${
                activeContent === 'dashboard' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </button>
          </li>
          
          <li>
            <div 
              onClick={toggleBoards}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer text-sm md:text-base transition-colors ${
                activeContent === 'boards' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Folder className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="flex-1 truncate">Boards</span>
              {isBoardsOpen ? (
                <ChevronUp className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              )}
            </div>
            
            {isBoardsOpen && (
              <div className="mt-3 border border-gray-200 rounded-md">
                <ul className="py-2 space-y-1">
                  {boards.length > 0 ? (
                    boards.map((board) => (
                      <li key={board.id}>
                        <button 
                          onClick={() => handleBoardSelect(board.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm md:text-base text-left transition-colors ${
                            activeBoardId === board.id 
                              ? 'text-blue-600 font-medium' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 ${
                            activeBoardId === board.id ? 'text-blue-500' : 'text-gray-300'
                          }`} />
                          <span className="truncate">{board.title}</span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-sm text-gray-400">
                      No boards available
                    </li>
                  )}
                </ul>
              </div>
            )}
          </li>

          <li>
            <button 
              onClick={() => handleNavigation('messages')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-sm md:text-base transition-colors ${
                activeContent === 'messages' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="flex-1 truncate">Messages</span>
              <span className="bg-orange-500 text-white text-xs md:text-sm rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-medium flex-shrink-0">
                3
              </span>
            </button>
          </li>

          <li>
            <button 
              onClick={() => handleNavigation('calendar')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-sm md:text-base transition-colors ${
                activeContent === 'calendar' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">Calendar</span>
            </button>
          </li>

          <li>
            <button 
              onClick={() => handleNavigation('team-members')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-sm md:text-base transition-colors ${
                activeContent === 'team-members' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">Team members</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom Section - Support and Logout */}
      <div className="p-3 md:p-4 space-y-2 border-t border-gray-200">
        <button 
          onClick={() => handleNavigation('support')}
          className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-sm md:text-base transition-colors ${
            activeContent === 'support' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <HelpCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="truncate">Support</span>
        </button>
        
        <button className="flex items-center space-x-3 px-3 py-2 bg-gray-700 text-white rounded-lg w-full text-sm md:text-base hover:bg-gray-800 transition-colors">
          <LogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
