import React from 'react';
import Layout from './Layout';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Settings className="mr-2" /> Settings
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600">Settings content goes here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;