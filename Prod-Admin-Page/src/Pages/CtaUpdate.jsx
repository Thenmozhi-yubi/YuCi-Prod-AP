import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../Constant";
import Cta from '../components/Cta';

const CtaUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [ctaConfig, setCtaConfig] = useState({
    heading: "",
    content: "",
    button: { text: "", link: "" },
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial CTA configuration
  useEffect(() => {
    const fetchCtaConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cta`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch CTA configuration");
        }

        const data = await response.json();
        if (data && data.ctaConfig) {
          setCtaConfig(data.ctaConfig);
          setSaveType("PUT"); // Data exists, so we'll use PUT
        } else {
          setSaveType("POST"); // No data, so we'll use POST
        }
      } catch (error) {
        console.warn("No existing CTA configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchCtaConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    if (!loading) {
      setHasChanges(true);
    }
  }, [ctaConfig, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('button')) {
      setCtaConfig(prev => ({
        ...prev,
        button: { ...prev.button, [name.split('.')[1]]: value },
      }));
    } else {
      setCtaConfig(prev => ({ ...prev, [name]: value }));
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cta`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify(ctaConfig),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} CTA configuration`);

      const data = await response.json();
      if (data.data && data.data.ctaConfig) {
        setCtaConfig(data.data.ctaConfig);
      }
      setHasChanges(false);
      alert(`CTA configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // After successful POST, switch to PUT for future saves
    
    } catch (error) {
      console.error(`Error ${saveType === "POST" ? "creating" : "updating"} CTA configuration:`, error);
      alert(`Failed to ${saveType.toLowerCase()} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Update CTA Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="heading">
                  Heading
                </label>
                <input
                  type="text"
                  id="heading"
                  name="heading"
                  value={ctaConfig.heading}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={ctaConfig.content}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="button.text">
                  Button Text
                </label>
                <input
                  type="text"
                  id="button.text"
                  name="button.text"
                  value={ctaConfig.button?.text}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="button.link">
                  Button Link
                </label>
                <input
                  type="text"
                  id="button.link"
                  name="button.link"
                  value={ctaConfig.button?.link}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="image">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={ctaConfig.image}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={saveChanges}
                  disabled={!hasChanges}
                  className={`px-6 py-3 rounded-md text-white transition flex-1 ${
                    hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {saveType === "POST" ? "Create CTA" : "Save Changes"}
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

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Preview CTA</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <Cta ctaConfig={ctaConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaUpdate;