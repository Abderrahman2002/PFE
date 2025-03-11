import React, { useState } from 'react';
import { LogOut, Settings, Moon, Sun,ChevronDown} from 'lucide-react';

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to toggle dark/light mode (e.g., update a global state or CSS class)
    document.documentElement.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-gray-200"
        />
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="py-1">
            {/* Settings Option */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;