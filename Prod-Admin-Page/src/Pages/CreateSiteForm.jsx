import { useState } from "react";
import { BASE_URL } from "../Constant";

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

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

    try {
      const response = await fetch(`${BASE_URL}/api/sites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Site created successfully:", data);
        showNotification("Success!", "Site created successfully", "success");
      } else {
        const errorData = await response.json();
        console.error("Error creating site:", errorData);
        showNotification("Error", "Failed to create site", "error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      showNotification("Error", "An error occurred", "error");
    } finally {
      setIsLoading(false);
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

  const showNotification = (title, message, type) => {
    alert(`${title}: ${message}`);
  };

  const inputClass = "mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 ease-in-out focus:border-[#FD7149] focus:ring-2 focus:ring-[#FD7149] focus:ring-opacity-20 hover:border-[#FD7149]";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FD7149]">Create a New Site</h1>
            <p className="text-gray-600 mt-2">Fill in the details to create your new website</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className={labelClass}>Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                    placeholder="Enter your site name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className={labelClass}>Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your site"
                    className={`${inputClass} min-h-[100px]`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">SEO Metadata</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="metadataDescription" className={labelClass}>Meta Description</label>
                  <textarea
                    id="metadataDescription"
                    name="metadata.description"
                    value={formData.metadata.description}
                    onChange={handleInputChange}
                    placeholder="Enter SEO description"
                    className={`${inputClass} min-h-[100px]`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="metadataUrl" className={labelClass}>Site URL</label>
                  <input
                    type="url"
                    id="metadataUrl"
                    name="metadata.url"
                    value={formData.metadata.url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="metadataLogo" className={labelClass}>Logo URL</label>
                  <input
                    type="url"
                    id="metadataLogo"
                    name="metadata.logo"
                    value={formData.metadata.logo}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#FD7149] text-white font-medium py-3 px-4 rounded-lg shadow-md 
                  hover:bg-[#e56642] transform hover:-translate-y-0.5 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#FD7149] focus:ring-opacity-50
                  disabled:opacity-70 disabled:cursor-not-allowed
                  ${isLoading ? 'animate-pulse' : ''}`}
              >
                {isLoading ? 'Creating Site...' : 'Create Site'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSiteForm;