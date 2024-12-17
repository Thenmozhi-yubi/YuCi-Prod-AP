import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";

const TrustUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial trust configuration
  useEffect(() => {
    const fetchTrustConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/trust`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch trust configuration");
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Populate fields if data exists
          setTitle(data.title || "");
          setImages(data.images || []);
          setSaveType("PUT"); // Switch to PUT since data exists
        } else {
          setSaveType("POST"); // No data found; use POST
        }
      } catch (error) {
        console.warn("No existing trust configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchTrustConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [title, images]);

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages(prev => [...prev, newImage.trim()]);
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trust`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify({
          title,
          images,
        }),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} trust configuration`);

      setHasChanges(false);
      alert(`Trust configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // Switch to PUT after successful POST
    } catch (error) {
      console.error(`Error saving trust configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Editor Section */}
      <div className="w-full md:w-1/3">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Update Trust Section</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Section Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Add New Image:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="border p-2 flex-1 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddImage}
                  disabled={!newImage.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    newImage.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
                  } transition`}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {images.map((imgSrc, index) => (
                <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-md shadow">
                  <img
                    src={imgSrc}
                    alt={`Trust logo ${index + 1}`}
                    className="w-32 h-20 object-contain rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges}
                className={`px-6 py-3 rounded-md text-white transition flex-1 ${
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
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-2/3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-center text-gray-900">{title || "Trust Section Title"}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((imgSrc, index) => (
                <div key={index} className="aspect-video bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={`Trust logo ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustUpdate;