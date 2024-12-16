import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Assuming the config file is in the same directory
import Cta from '../components/Cta';

const CtaUpdate = ({ ctaConfig = {}, setCtaConfig }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('button')) {
      setCtaConfig((prev) => ({
        ...prev,
        button: { ...prev.button, [name.split('.')[1]]: value },
      }));
    } else {
      setCtaConfig((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem('ctaConfig', JSON.stringify(ctaConfig));
    navigate('/');
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update CTA Section</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={ctaConfig.heading || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={ctaConfig.content || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="button.text">Button Text</label>
            <input
              type="text"
              id="button.text"
              name="button.text"
              value={ctaConfig.button?.text || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="button.link">Button Link</label>
            <input
              type="text"
              id="button.link"
              name="button.link"
              value={ctaConfig.button?.link || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={ctaConfig.image || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Preview TopNav</h2>
          <Cta ctaConfig={ctaConfig} />
        </div>
      </div>
    </div>
  );
};


export default CtaUpdate;
