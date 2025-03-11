import React from 'react';
import Layout from './Layout';
import { BarChart } from 'lucide-react';

const Analytics = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <BarChart className="mr-2" /> Analytics
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600">Analytics content goes here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;