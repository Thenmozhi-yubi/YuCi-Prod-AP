import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";
import Feature from "../components/Feature";
import { useAuth } from "../Auth/UseAuth";

const FeatureUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: ""
  });
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // New state for selected feature template
  const [selectedFeatureTemplate, setSelectedFeatureTemplate] = useState("1");

  // Fetch initial feature configuration
  useEffect(() => {
    const fetchFeatureConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/feature`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feature configuration");
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Populate fields if data exists
          setFormData(data.heading || {
            title: "",
            subtitle: "",
            description: ""
          });
          setFeatures(data.features || []);
          // Set the previously selected template if available
          setSelectedFeatureTemplate(data.selectedfeature || "1");
          setSaveType("PUT"); // Switch to PUT since data exists
        } else {
          setSaveType("POST"); // No data found; use POST
        }
      } catch (error) {
        console.warn("No existing feature configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData, features, selectedFeatureTemplate]);

  const handleHeadingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (id, field, value) => {
    setFeatures(prev =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    );
  };

  const addFeature = () => {
    const newFeature = {
      id: features.length + 1,
      title: "",
      subtitle: "",
      content: "",
      image: "",
      buttonText: "",
      isImageLeft: true,
    };
    setFeatures(prev => [...prev, newFeature]);
  };

  const removeFeature = (id) => {
    setFeatures(prev => prev.filter((feature) => feature.id !== id));
  };

  const saveChanges = async () => {
    const updatedConfig = {
      heading: formData,
      features,
      selectedfeature: selectedFeatureTemplate, // Add selected feature template
    };

    try {
      const response = await fetch(`${BASE_URL}/api/feature`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify(updatedConfig),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} feature configuration`);

      setHasChanges(false);
      alert(`Feature configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // Switch to PUT after successful POST
    } catch (error) {
      console.error(`Error saving feature configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Editing Section */}
        <div className="col-span-12 lg:col-span-4">
          <h2 className="text-2xl font-bold mb-4">Update Features</h2>
          
          {/* Feature Template Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Feature Template:</label>
            <select
              value={selectedFeatureTemplate}
              onChange={(e) => setSelectedFeatureTemplate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="1">Template 1</option>
              <option value="2">Template 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Heading Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleHeadingChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <label className="block text-gray-700 font-medium mt-2">Heading Subtitle:</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleHeadingChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <label className="block text-gray-700 font-medium mt-2">Heading Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleHeadingChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {features.map((feature) => (
            <div key={feature.id} className="mb-6 border p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Feature {feature.id}</h3>
              <input
                type="text"
                placeholder="Title"
                value={feature.title}
                onChange={(e) => handleFeatureChange(feature.id, "title", e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={feature.subtitle}
                onChange={(e) => handleFeatureChange(feature.id, "subtitle", e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2"
              />
              <textarea
                placeholder="Content"
                value={feature.content}
                onChange={(e) => handleFeatureChange(feature.id, "content", e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={feature.image}
                onChange={(e) => handleFeatureChange(feature.id, "image", e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Button Text"
                value={feature.buttonText}
                onChange={(e) => handleFeatureChange(feature.id, "buttonText", e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2"
              />
              <select
                value={feature.isImageLeft ? "left" : "right"}
                onChange={(e) => handleFeatureChange(feature.id, "isImageLeft", e.target.value === "left")}
                className="w-full px-4 py-2 border rounded-md mb-2"
              >
                <option value="left">Image Left</option>
                <option value="right">Image Right</option>
              </select>
              <button
                onClick={() => removeFeature(feature.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={addFeature}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              Add Feature
            </button>
            <button
              onClick={saveChanges}
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

        {/* Live Preview Section */}
        <div className="col-span-12 lg:col-span-8">
          <h3 className="text-xl font-bold mb-4">Live Preview</h3>
          <div className="border p-4 rounded-md">
            <Feature featureConfig={{ 
              heading: formData, 
              features,
              selectedfeature: selectedFeatureTemplate // Pass selected template to preview
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureUpdate;