import { create } from 'zustand';
import { Board, getBoards, initializeBoards, createBoard as createNewBoard, getActiveBoardId, setActiveBoardId } from '../utils/boardStorage';

export type ContentType = 'dashboard' | 'boards' | 'messages' | 'calendar' | 'team-members' | 'support';

interface AppState {
  // UI State
  activeContent: ContentType;
  setActiveContent: (content: ContentType) => void;
  
  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Board State
  activeBoardId: string;
  setActiveBoardId: (boardId: string) => void;
  boards: Board[];
  currentBoard: Board | null;
  
  // Actions
  createBoard: (title: string, description: string, assignedUsers?: any[]) => Board;
  refreshBoards: () => void;
  initializeApp: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  activeContent: 'boards',
  searchQuery: '',
  activeBoardId: '',
  boards: [],
  currentBoard: null,

  // UI Actions
  setActiveContent: (content: ContentType) => set({ activeContent: content }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  // Board Actions
  setActiveBoardId: (boardId: string) => {
    const { boards } = get();
    const board = boards.find(b => b.id === boardId);
    
    set({ 
      activeBoardId: boardId, 
      currentBoard: board || null 
    });
    
    // Persist to storage
    setActiveBoardId(boardId);
  },

  createBoard: (title: string, description: string, assignedUsers: any[] = []): Board => {
    const newBoard = createNewBoard(title, description, assignedUsers);
    
    set(state => ({
      boards: [...state.boards, newBoard],
      activeBoardId: newBoard.id,
      currentBoard: newBoard
    }));
    
    // Persist active board to storage
    setActiveBoardId(newBoard.id);
    
    return newBoard;
  },

  refreshBoards: () => {
    const updatedBoards = getBoards();
    const { activeBoardId } = get();
    const updatedCurrentBoard = activeBoardId 
      ? updatedBoards.find(b => b.id === activeBoardId) || null
      : null;
    
    set({ 
      boards: updatedBoards, 
      currentBoard: updatedCurrentBoard 
    });
  },

  initializeApp: () => {
    const initializedBoards = initializeBoards();
    const savedActiveBoardId = getActiveBoardId();
    
    let activeBoardId = '';
    let currentBoard: Board | null = null;
    
    if (savedActiveBoardId && initializedBoards.find(b => b.id === savedActiveBoardId)) {
      activeBoardId = savedActiveBoardId;
      currentBoard = initializedBoards.find(b => b.id === savedActiveBoardId) || null;
    } else if (initializedBoards.length > 0) {
      activeBoardId = initializedBoards[0].id;
      currentBoard = initializedBoards[0];
      setActiveBoardId(initializedBoards[0].id);
    }
    
    set({
      boards: initializedBoards,
      activeBoardId,
      currentBoard
    });
  }
}));
