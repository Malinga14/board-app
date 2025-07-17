import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Dashboard from './Dashboard';
import Board from '../board/Board';
import Messages from './Messages';
import Calendar from './Calendar';
import TeamMembers from './TeamMembers';
import Support from './Support';

const ContentManager = () => {
  const { activeContent, activeBoardId } = useAppContext();

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

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
};

export default ContentManager;
