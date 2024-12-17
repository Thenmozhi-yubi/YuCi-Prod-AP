import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";
import { useAuth } from "../Auth/UseAuth";

const HeroUpdate = () => {
  const { id } = useParams(); // siteid passed via route params
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonBgColor, setButtonBgColor] = useState("");
  const [buttonTextColor, setButtonTextColor] = useState("");

  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST"); // POST or PUT

  const navigate = useNavigate();
const {token} = useAuth()

  // Fetch initial hero configuration
  useEffect(() => {
    const fetchHeroConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hero`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id, // Pass siteid as a custom header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hero configuration");
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Populate fields if data exists
          setTitle(data.Hero_title || "");
          setSubtitle(data.Hero_subtitle || "");
          setBgImage(data.Bg_Img_URL || "");
          setButtonText(data.ButtonText || "");
          setButtonBgColor(data.ButtonBgColor || "");
          setButtonTextColor(data.ButtonTextColor || "");

          setSaveType("PUT"); // Switch to PUT since data exists
        } else {
          setSaveType("POST"); // No data found; use POST
        }
      } catch (error) {
        console.warn("No existing hero configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [title, subtitle, bgImage, buttonText, buttonBgColor, buttonTextColor]);

  // Save changes via POST or PUT request
  const saveChanges = async () => {
    const updatedConfig = {
      Hero_title: title,
      Hero_subtitle: subtitle,
      Bg_Img_URL: bgImage,
      ButtonText: buttonText,
      ButtonBgColor: buttonBgColor,
      ButtonTextColor: buttonTextColor,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/hero`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id, // Pass siteid for both POST and PUT
        },
        body: JSON.stringify(updatedConfig),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} hero configuration`);

      setHasChanges(false);
      alert(`Hero configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // Switch to PUT after successful POST
    } catch (error) {
      console.error(`Error saving hero configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      <div className="lg:w-4/12">
        <h2 className="text-2xl font-bold mb-6">Update Hero Section</h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Hero Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Hero Subtitle:</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
          />
        </div>

        {/* Background Image */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Background Image URL:</label>
          <input
            type="text"
            value={bgImage}
            onChange={(e) => setBgImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
          />
        </div>

        {/* Button Text */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Button Text:</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
          />
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">Button Background Color:</label>
              <input
                type="color"
                value={buttonBgColor}
                onChange={(e) => setButtonBgColor(e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">Button Text Color:</label>
              <input
                type="color"
                value={buttonTextColor}
                onChange={(e) => setButtonTextColor(e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
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

      {/* Live Preview */}
      <div className="lg:w-8/12">
        <h3 className="text-xl font-bold mb-4">Live Preview</h3>
        <div
          className="p-6 rounded-md shadow-md h-80 flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-800 bg-white bg-opacity-80 p-2 rounded-md">
            {title || "Hero Title"}
          </h1>
          <p className="text-gray-600 mb-4 bg-white bg-opacity-80 p-2 rounded-md">
            {subtitle || "Hero Subtitle"}
          </p>
          <button
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            className="px-4 py-2 rounded-md shadow-md"
          >
            {buttonText || "Button Text"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroUpdate;
