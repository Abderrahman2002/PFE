import React from 'react';
import Layout from './Layout';
import { ShoppingCart } from 'lucide-react';

const Orders = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2" /> Orders
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600">Orders content goes here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;