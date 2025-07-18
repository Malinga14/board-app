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
