import React from 'react';
import { Edit3 } from 'lucide-react';

interface ManageButtonProps {
  onClick?: () => void;
  className?: string;
}

const ManageButton: React.FC<ManageButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200 ${className}`}
    >
      <span className="text-sm font-medium">Manage</span>
      <Edit3 className="w-4 h-4" />
    </button>
  );
};

export default ManageButton;
