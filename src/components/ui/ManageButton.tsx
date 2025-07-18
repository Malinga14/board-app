import React, { useState, useRef, useEffect } from 'react';
import { Edit3, Settings, Users, FileText, ChevronDown } from 'lucide-react';

interface ManageButtonProps {
  onClick?: () => void;
  className?: string;
  onEditTitle?: () => void;
  onEditDescription?: () => void;
  onManageMembers?: () => void;
}

const ManageButton: React.FC<ManageButtonProps> = ({ 
  onClick, 
  className = '',
  onEditTitle,
  onEditDescription,
  onManageMembers
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMainClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleOptionClick = (action: () => void) => {
    setShowDropdown(false);
    action();
  };

  // If no individual handlers are provided, use the main onClick
  if (!onEditTitle && !onEditDescription && !onManageMembers) {
    return (
      <button 
        onClick={handleMainClick}
        className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200 ${className}`}
      >
        <span className="text-sm font-medium">Manage</span>
        <Edit3 className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200 ${className}`}
      >
        <span className="text-sm font-medium">Manage</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 top-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {onEditTitle && (
            <button
              onClick={() => handleOptionClick(onEditTitle)}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 rounded-t-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Edit Title</span>
            </button>
          )}
          {onEditDescription && (
            <button
              onClick={() => handleOptionClick(onEditDescription)}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Description</span>
            </button>
          )}
          {onManageMembers && (
            <button
              onClick={() => handleOptionClick(onManageMembers)}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 rounded-b-lg"
            >
              <Users className="w-4 h-4" />
              <span>Manage Members</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageButton;
