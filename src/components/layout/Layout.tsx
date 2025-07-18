"use client";

import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import MainContentArea from '../main_content_area/MainContentArea';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Overlay - positioned behind sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Your Original Design */}
        <div className={`
          fixed md:relative z-30 md:z-auto
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-56 md:w-56 lg:w-60 xl:w-64
          h-full md:h-auto
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <MainContentArea>
            {children}
          </MainContentArea>
        </div>
      </div>
    </div>
  );
};

export default Layout;
