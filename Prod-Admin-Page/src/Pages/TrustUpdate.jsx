import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrustUpdate = ({ trustConfig, setTrustConfig }) => {
  const [title, setTitle] = useState(trustConfig.title || "");
  const [images, setImages] = useState(trustConfig.images || []);
  const [newImage, setNewImage] = useState("");

  const navigate = useNavigate();

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()]);
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    const updatedConfig = { title, images };
    setTrustConfig(updatedConfig);
    localStorage.setItem("trustConfig", JSON.stringify(updatedConfig));
    navigate("/");
  };

  return (
    <div className="flex p-8">
      {/* Editor Section */}
      <div className="w-1/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">Update Trust Section</h1>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold">Section Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold">Add New Image:</label>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
            className="border p-2 w-full"
          />
          <button
            onClick={handleAddImage}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>
        <div className="space-y-4">
          {images.map((imgSrc, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={imgSrc}
                alt={`Preview ${index}`}
                className="w-32 h-20 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveChanges}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
        >
          Save Changes
        </button>
      </div>
      {/* Preview Section */}
      <div className="w-2/3 pl-4 border-l">
        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide max-w-[640px]">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Trust Image ${index + 1}`}
              className="w-64 h-40 object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustUpdate;
