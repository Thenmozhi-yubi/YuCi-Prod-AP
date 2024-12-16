import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoSectionUpdate = ({ videoConfig, setVideoConfig }) => {
  const [title, setTitle] = useState(videoConfig.heading?.title || "");
  const [description, setDescription] = useState(videoConfig.heading?.description || "");
  const [videoSrc, setVideoSrc] = useState(videoConfig.videoSrc || "");

  const navigate = useNavigate();

  const handleSave = () => {
    // Update the main config
    setVideoConfig({
      heading: { title, description },
      videoSrc,
    });

    // Redirect to the homepage
    navigate("/");
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      {/* Left Column: Form */}
      <div className="col-span-4 border-r pr-4">
        <h2 className="text-2xl font-bold mb-4">Edit Video Section</h2>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Video URL:
          <input
            type="text"
            value={videoSrc}
            onChange={(e) => setVideoSrc(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Save Changes
        </button>
      </div>

      {/* Right Column: Preview */}
      <div className="col-span-8 pl-4">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="p-4 border rounded shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">{title || "Preview Title"}</h1>
            <p className="text-gray-800 mt-2">{description || "Preview description..."}</p>
          </div>
          <div className="video-container w-full max-w-4xl mx-auto">
            {videoSrc ? (
              <video
                controls
                className="w-full h-auto rounded-md shadow-lg"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-gray-600 text-center">Video will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSectionUpdate;
