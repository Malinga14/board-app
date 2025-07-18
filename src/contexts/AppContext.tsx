"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Board, getBoards, initializeBoards, createBoard as createNewBoard, getActiveBoardId, setActiveBoardId } from '../utils/boardStorage';

export type ContentType = 'dashboard' | 'boards' | 'messages' | 'calendar' | 'team-members' | 'support';

interface AppContextType {
  activeContent: ContentType;
  setActiveContent: (content: ContentType) => void;
  activeBoardId?: string;
  setActiveBoardId: (boardId: string) => void;
  boards: Board[];
  currentBoard: Board | null;
  createBoard: (title: string, description: string, assignedUsers?: any[]) => Board;
  refreshBoards: () => void;
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
  const [activeBoardId, setActiveBoardIdState] = useState<string>('');
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  // Initialize boards and active board on mount
  useEffect(() => {
    const initializedBoards = initializeBoards();
    setBoards(initializedBoards);
    
    const savedActiveBoardId = getActiveBoardId();
    if (savedActiveBoardId && initializedBoards.find(b => b.id === savedActiveBoardId)) {
      setActiveBoardIdState(savedActiveBoardId);
      setCurrentBoard(initializedBoards.find(b => b.id === savedActiveBoardId) || null);
    } else if (initializedBoards.length > 0) {
      setActiveBoardIdState(initializedBoards[0].id);
      setCurrentBoard(initializedBoards[0]);
      setActiveBoardId(initializedBoards[0].id);
    }
  }, []);

  // Update current board when active board ID changes
  useEffect(() => {
    if (activeBoardId) {
      const board = boards.find(b => b.id === activeBoardId);
      setCurrentBoard(board || null);
    }
  }, [activeBoardId, boards]);

  const handleSetActiveBoardId = (boardId: string) => {
    setActiveBoardIdState(boardId);
    setActiveBoardId(boardId);
    const board = boards.find(b => b.id === boardId);
    setCurrentBoard(board || null);
  };

  const handleCreateBoard = (title: string, description: string, assignedUsers: any[] = []): Board => {
    const newBoard = createNewBoard(title, description, assignedUsers);
    setBoards(prev => [...prev, newBoard]);
    setActiveBoardIdState(newBoard.id);
    setCurrentBoard(newBoard);
    setActiveBoardId(newBoard.id);
    return newBoard;
  };

  const refreshBoards = () => {
    const updatedBoards = getBoards();
    setBoards(updatedBoards);
    
    // Update current board if it still exists
    if (activeBoardId) {
      const updatedCurrentBoard = updatedBoards.find(b => b.id === activeBoardId);
      setCurrentBoard(updatedCurrentBoard || null);
    }
  };

  const value: AppContextType = {
    activeContent,
    setActiveContent,
    activeBoardId,
    setActiveBoardId: handleSetActiveBoardId,
    boards,
    currentBoard,
    createBoard: handleCreateBoard,
    refreshBoards
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
