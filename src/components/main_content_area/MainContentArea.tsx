import React from 'react';
import { MoreHorizontal, Calendar as CalendarIcon, Users } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import Dashboard from '../content/Dashboard';
import Board from '../board/Board';
import Messages from '../content/Messages';
import Calendar from '../content/Calendar';
import TeamMembers from '../content/TeamMembers';
import Support from '../content/Support';

interface MainContentAreaProps {
  children?: React.ReactNode;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  const { activeContent, activeBoardId } = useAppContext();

  const getHeaderContent = () => {
    switch (activeContent) {
      case 'boards':
        return {
          title: 'Sport Xi Project',
          subtitle: 'event production',
          status: 'In progress',
          showProjectInfo: true
        };
      case 'dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Overview of your workspace',
          showProjectInfo: false
        };
      case 'messages':
        return {
          title: 'Messages',
          subtitle: 'Communication hub',
          showProjectInfo: false
        };
      case 'calendar':
        return {
          title: 'Calendar',
          subtitle: 'Schedule and events',
          showProjectInfo: false
        };
      case 'team-members':
        return {
          title: 'Team Members',
          subtitle: 'Manage your team',
          showProjectInfo: false
        };
      case 'support':
        return {
          title: 'Support',
          subtitle: 'Help and documentation',
          showProjectInfo: false
        };
      default:
        return {
          title: 'Workspace',
          subtitle: '',
          showProjectInfo: false
        };
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return <Dashboard />;
      case 'boards':
        return <Board />;
      case 'messages':
        return <Messages />;
      case 'calendar':
        return <Calendar />;
      case 'team-members':
        return <TeamMembers />;
      case 'support':
        return <Support />;
      default:
        return <Board />;
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col h-full">
      {/* Dynamic Header - Only for boards */}
      {activeContent === 'boards' && headerContent.showProjectInfo && (
        <div className="bg-white border-b border-gray-200 p-4 md:p-6 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{headerContent.title}</h1>
                {headerContent.status && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 self-start">
                    {headerContent.status}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1 text-sm md:text-base">{headerContent.subtitle}</p>
              
              {headerContent.showProjectInfo && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${activeContent === 'boards' ? 'p-3 md:p-6' : activeContent === 'messages' ? '' : 'p-3 md:p-6'} flex-1 flex flex-col min-h-0`}>
        <div className="flex-1 overflow-hidden">
          {children || renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainContentArea;
