import React from 'react';
import Layout from './Layout';
import { Package } from 'lucide-react';

const Products = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Package className="mr-2" /> Products
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600">Products content goes here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Products;