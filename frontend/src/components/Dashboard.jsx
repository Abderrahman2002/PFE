import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Users, Package, DollarSign, BarChart } from 'lucide-react'; // Import all required icons

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Users Card */}
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

          {/* Total Products Card */}
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

          {/* Total Revenue Card */}
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

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
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
    </Layout>
  );
};

export default Dashboard;