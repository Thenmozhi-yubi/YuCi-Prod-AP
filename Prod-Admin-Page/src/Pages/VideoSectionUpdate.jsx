import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";

const VideoSectionUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial video configuration
  useEffect(() => {
    const fetchVideoConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/video`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch video configuration");
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Populate fields if data exists
          setTitle(data.heading?.title || "");
          setDescription(data.heading?.description || "");
          setVideoSrc(data.videoSrc || "");
          setSaveType("PUT"); // Switch to PUT since data exists
        } else {
          setSaveType("POST"); // No data found; use POST
        }
      } catch (error) {
        console.warn("No existing video configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [title, description, videoSrc]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/video`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify({
          heading: { title, description },
          videoSrc,
        }),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} video configuration`);

      setHasChanges(false);
      alert(`Video configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // Switch to PUT after successful POST
    } catch (error) {
      console.error(`Error saving video configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      {/* Left Column: Form */}
      <div className="col-span-12 md:col-span-4 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Video Section</h2>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Title:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Video URL:</span>
            <input
              type="text"
              value={videoSrc}
              onChange={(e) => setVideoSrc(e.target.value)}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-md text-white transition ${
              hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {saveType === "POST" ? "Create" : "Save Changes"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Right Column: Preview */}
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-2xl font-bold mb-6">Preview</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              {title || "Preview Title"}
            </h1>
            <p className="text-gray-700 mt-3 text-lg">
              {description || "Preview description..."}
            </p>
          </div>
          
          <div className="video-container w-full max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
            {videoSrc ? (
              <video
                controls
                className="w-full h-auto rounded-lg shadow-lg"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Video preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSectionUpdate;