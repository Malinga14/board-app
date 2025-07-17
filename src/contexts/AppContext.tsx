"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ContentType = 'dashboard' | 'boards' | 'messages' | 'calendar' | 'team-members' | 'support';

interface AppContextType {
  activeContent: ContentType;
  setActiveContent: (content: ContentType) => void;
  activeBoardId?: string;
  setActiveBoardId: (boardId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeContent, setActiveContent] = useState<ContentType>('boards');
  const [activeBoardId, setActiveBoardId] = useState<string>('sport-xi-project');

  return (
    <AppContext.Provider value={{
      activeContent,
      setActiveContent,
      activeBoardId,
      setActiveBoardId
    }}>
      {children}
    </AppContext.Provider>
  );
};
