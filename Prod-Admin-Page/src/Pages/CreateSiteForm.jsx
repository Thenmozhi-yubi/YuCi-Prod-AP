import { useState } from "react";
import {BASE_URL} from "../Constant"

const CreateSiteForm = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    description: "",
    metadata: {
      description: "",
      url: "",
      logo: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY"; // Replace with your actual token
  
    try {
      const response = await fetch(`${BASE_URL}/api/sites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
          "Authorization": `Bearer ${token}`, // Add Bearer token for authentication
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Site created successfully:", data);
        alert("Site created successfully!"); // Optional success message
      } else {
        const errorData = await response.json();
        console.error("Error creating site:", errorData);
        alert("Failed to create site. Check console for details."); // Optional error message
      }
    } catch (error) {
      console.error("An error occurred while creating the site:", error);
      alert("An error occurred. Check console for details."); // Optional error message
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("metadata.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Site
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Site Name */}
          <div className="mb-5">
            <label
              htmlFor="siteName"
              className="block text-sm font-medium text-gray-700"
            >
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              placeholder="Enter site name"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter site description"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              rows="3"
              required
            />
          </div>

          {/* Metadata Description */}
          <div className="mb-5">
            <label
              htmlFor="metadataDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Metadata Description
            </label>
            <textarea
              id="metadataDescription"
              name="metadata.description"
              value={formData.metadata.description}
              onChange={handleInputChange}
              placeholder="Enter metadata description"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              rows="3"
              required
            />
          </div>

          {/* Metadata URL */}
          <div className="mb-5">
            <label
              htmlFor="metadataUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Metadata URL
            </label>
            <input
              type="url"
              id="metadataUrl"
              name="metadata.url"
              value={formData.metadata.url}
              onChange={handleInputChange}
              placeholder="Enter metadata URL"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          {/* Metadata Logo */}
          <div className="mb-5">
            <label
              htmlFor="metadataLogo"
              className="block text-sm font-medium text-gray-700"
            >
              Metadata Logo URL
            </label>
            <input
              type="url"
              id="metadataLogo"
              name="metadata.logo"
              value={formData.metadata.logo}
              onChange={handleInputChange}
              placeholder="Enter logo URL"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Create Site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSiteForm;
