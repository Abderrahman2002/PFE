import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Users as UsersIcon } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <UsersIcon className="mr-2" /> Users
        </h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;