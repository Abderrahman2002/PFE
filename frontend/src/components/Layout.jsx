import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users,
  Package,
  DollarSign,
  Truck,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
  Home,
  Settings,
  Bell,
  ShoppingCart,
  BarChart,
  User,
  UserPlus,
  List,
  PlusCircle,
  Box,
  PlusSquare,
  LineChart,
  FileText,
  Sliders,
  Edit,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const DropdownMenu = ({ icon: Icon, label, dropdown, navigate, location, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center md:justify-between p-3 rounded-xl transition-all duration-200 w-full ${
          dropdown.some((item) => location.pathname === item.path)
            ? 'bg-blue-600 text-white'
            : 'hover:bg-blue-50 text-gray-700 dark:hover:bg-gray-700'
        }`}
      >
        <div className="flex items-center space-x-4">
          <Icon
            className={`h-6 w-6 ${
              dropdown.some((item) => location.pathname === item.path)
                ? 'text-white'
                : 'text-blue-600 dark:text-gray-300'
            }`}
          />
          {!isCollapsed && <span className="text-lg">{label}</span>}
        </div>
        {!isCollapsed && (
          isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )
        )}
      </button>

      {isOpen && (
        <div className={`${isCollapsed ? 'pl-0' : 'pl-6'} space-y-1 mt-1`}>
          {dropdown.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center md:justify-start p-3 rounded-xl transition-all duration-200 w-full ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  location.pathname === item.path ? 'text-white' : 'text-blue-600 dark:text-gray-300'
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

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle('dark', prefersDarkMode);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    {
      icon: Users,
      label: 'Users',
      dropdown: [
        { icon: User, label: 'View Users', path: '/users' },
        { icon: UserPlus, label: 'Add User', path: '/users/add' },
      ],
    },
    {
      icon: ShoppingCart,
      label: 'Orders',
      dropdown: [
        { icon: List, label: 'View Orders', path: '/orders' },
        { icon: PlusCircle, label: 'Add Order', path: '/orders/add' },
      ],
    },
    {
      icon: Package,
      label: 'Products',
      dropdown: [
        { icon: Box, label: 'View Products', path: '/products' },
        { icon: PlusSquare, label: 'Add Product', path: '/products/add' },
      ],
    },
    {
      icon: BarChart,
      label: 'Analytics',
      dropdown: [
        { icon: LineChart, label: 'View Analytics', path: '/analytics' },
        { icon: FileText, label: 'Generate Report', path: '/analytics/report' },
      ],
    },
    {
      icon: Settings,
      label: 'Settings',
      dropdown: [
        { icon: Sliders, label: 'View Settings', path: '/settings' },
        { icon: Edit, label: 'Edit Settings', path: '/settings/edit' },
      ],
    },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-xl flex-shrink-0 transition-all duration-300 z-50 ${
          isCollapsed ? 'w-20' : 'w-80'
        } ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-hidden flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            {!isCollapsed && <h1 className="text-2xl font-bold">Dashboard</h1>}
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.dropdown ? (
                <DropdownMenu
                  icon={item.icon}
                  label={item.label}
                  dropdown={item.dropdown}
                  navigate={navigate}
                  location={location}
                  isCollapsed={isCollapsed}
                />
              ) : (
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-center md:justify-start p-3 rounded-xl transition-all duration-200 w-full ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-50 text-gray-700 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      location.pathname === item.path ? 'text-white' : 'text-blue-600 dark:text-gray-300'
                    }`}
                  />
                  {!isCollapsed && <span className="text-lg ml-4">{item.label}</span>}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button (Fixed at Bottom) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center md:justify-start p-3 rounded-xl hover:bg-red-50 text-red-600 w-full transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-6 w-6" />
            {!isCollapsed && <span className="text-lg ml-4">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Menu className="h-7 w-7" />
              </button>

              <div className="flex-1"></div>

              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 transform translate-x-1 -translate-y-1"></span>
                </button>

                <ProfileDropdown toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;