'use client';

import React, { useState } from 'react';

const AdminPage = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleAddProduct = () => {
    // Logic to add product to Firestore will go here
    console.log('Adding product:', { productName, productDescription, productPrice, productImage });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="productName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="productDescription"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="productPrice"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* User information section will be added here later */}
    </div>
  );
};

export default AdminPage;
