import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };

  useEffect(() => {
    fetchDashboardData();
  },[]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token
        },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      localStorage.removeItem('token'); // Clear the token
      navigate('/login'); // Redirect to login if unauthorized
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {dashboardData ? (
        <div>
          <p>{dashboardData.message}</p>
          <p>{dashboardData.data}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;