"use client";

import { useAppStore } from '../store/appStore';

export const ZustandTest = () => {
  const { activeContent, activeBoardId, boards } = useAppStore();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs max-w-xs">
      <div>Zustand State:</div>
      <div>Content: {activeContent}</div>
      <div>Board ID: {activeBoardId}</div>
      <div>Boards: {boards.length}</div>
    </div>
  );
};
