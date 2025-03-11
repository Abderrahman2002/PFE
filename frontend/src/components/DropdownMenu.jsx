import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DropdownMenu = ({ icon: Icon, label, dropdown, navigate, location, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center md:justify-between p-3 rounded-xl transition-all duration-200 w-full ${
          dropdown.some((item) => location.pathname === item.path)
            ? 'bg-blue-600 text-white'
            : 'hover:bg-blue-50 text-gray-700'
        }`}
      >
        <div className="flex items-center space-x-4">
          <Icon
            className={`h-6 w-6 ${
              dropdown.some((item) => location.pathname === item.path)
                ? 'text-white'
                : 'text-blue-600'
            }`}
          />
          {!isCollapsed && <span className="text-lg">{label}</span>}
        </div>
        {!isCollapsed && (
          isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )
        )}
      </button>

      {/* Dropdown Items */}
      {isOpen && (
        <div className={`${isCollapsed ? 'pl-0' : 'pl-6'} space-y-1 mt-1`}>
          {dropdown.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center md:justify-start p-3 rounded-xl transition-all duration-200 w-full ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  location.pathname === item.path ? 'text-white' : 'text-blue-600'
                }`}
              />
              {!isCollapsed && (
                <span className="text-md ml-4">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;