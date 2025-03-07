import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, DollarSign, Truck, 
  LogOut, Menu, ChevronDown, Home,
  Settings, Bell, ShoppingCart, BarChart
} from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users', count: '1,234' },
    { icon: ShoppingCart, label: 'Orders', count: '456' },
    { icon: Package, label: 'Products', count: '89' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex overflow-hidden">
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white shadow-xl text-gray-800 w-80 flex-shrink-0 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static h-full z-50`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="md:hidden">
              <Menu className="h-7 w-7" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <item.icon className={`h-6 w-6 ${item.active ? 'text-white' : 'text-blue-600'}`} />
                  <span className="text-lg">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.active ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </a>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-red-50 text-red-600 w-full mt-6 transition-colors duration-200"
            >
              <LogOut className="h-6 w-6" />
              <span className="text-lg">Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-7 w-7" />
              </button>

              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center space-x-4 border-l pl-4">
                  <span className="text-gray-700 text-lg">John Doe</span>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-gray-200"
                  />
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-200 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold mt-2">1,234</p>
                    <p className="text-green-500 text-sm mt-2">+12% from last month</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-2xl">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-200 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg text-gray-500">Total Products</p>
                    <p className="text-3xl font-bold mt-2">456</p>
                    <p className="text-green-500 text-sm mt-2">+8% from last month</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-200 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold mt-2">$89,234</p>
                    <p className="text-green-500 text-sm mt-2">+15% from last month</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-2xl">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                {dashboardData ? (
                  <div className="space-y-6">
                    <p className="text-gray-600 text-lg">{dashboardData.message}</p>
                    <p className="text-gray-600 text-lg">{dashboardData.data}</p>
                  </div>
                ) : (
                  <div className="animate-pulse space-y-6">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;