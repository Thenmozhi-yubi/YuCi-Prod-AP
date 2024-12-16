import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroUpdate = ({ heroConfig, setHeroConfig }) => {
  const [title, setTitle] = useState(heroConfig.title);
  const [subtitle, setSubtitle] = useState(heroConfig.subtitle);
  const [bgImage, setBgImage] = useState(heroConfig.bgImage);
  const [buttonText, setButtonText] = useState(heroConfig.buttonText);
  const [buttonBgColor, setButtonBgColor] = useState(heroConfig.buttonBgColor);
  const [buttonTextColor, setButtonTextColor] = useState(heroConfig.buttonTextColor);

  const navigate = useNavigate();

  const hasChanges =
    title !== heroConfig.title ||
    subtitle !== heroConfig.subtitle ||
    bgImage !== heroConfig.bgImage ||
    buttonText !== heroConfig.buttonText ||
    buttonBgColor !== heroConfig.buttonBgColor ||
    buttonTextColor !== heroConfig.buttonTextColor;

  const saveChanges = () => {
    const updatedConfig = {
      title,
      subtitle,
      bgImage,
      buttonText,
      buttonBgColor,
      buttonTextColor,
    };
    setHeroConfig(updatedConfig);
    localStorage.setItem("heroConfig", JSON.stringify(updatedConfig));
    navigate("/");
  };

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Left Section: Editing Options */}
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

        {/* Background Image URL */}
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

        {/* Button Colors */}
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

          {/* Preset Color Option */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quick Select Color:</label>
            <div className="flex gap-4">
              <button
                onClick={() => setButtonBgColor("#1e2737")}
                className="w-10 h-10 rounded-md"
                style={{ backgroundColor: "#1e2737" }}
                aria-label="Preset Button Background Color"
              />
              <button
                onClick={() => setButtonTextColor("#ffffff")}
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: "#ffffff", borderColor: "#cccccc" }}
                aria-label="Preset Button Text Color"
              />
            </div>
          </div>
        </div>

        {/* Save and Back Buttons */}
        <div className="flex gap-4">
          <button
            onClick={saveChanges}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-md text-white transition ${hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Right Section: Live Preview */}
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
