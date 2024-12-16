import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav"; // Import the TopNav component for live preview

const NavUpdate = ({ setConfig }) => {
  const [logo, setLogo] = useState("");
  const [useCases, setUseCases] = useState([]);
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const navigate = useNavigate();

  // Load the config from localStorage on initial mount
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("config"));
    if (savedConfig) {
      setLogo(savedConfig.logo || "");
      setUseCases(savedConfig.useCases || []);
      setCtaText(savedConfig.cta?.text || "");
      setCtaLink(savedConfig.cta?.link || "");
    }
  }, []);

  // Check if there are any changes in the input fields
  const hasChanges =
    logo !== "" ||
    useCases.length > 0 ||
    ctaText !== "" ||
    ctaLink !== "";

  const handleSave = () => {
    const updatedConfig = {
      logo,
      useCases,
      cta: { text: ctaText, link: ctaLink },
    };

    // Save the config to localStorage
    localStorage.setItem("config", JSON.stringify(updatedConfig));

    // Update the parent config state
    setConfig(updatedConfig);

    // Redirect to home page
    navigate("/");
  };

  const handleUseCaseChange = (index, value) => {
    const updatedUseCases = [...useCases];
    updatedUseCases[index] = value;
    setUseCases(updatedUseCases);
  };

  const handleAddUseCase = () => {
    setUseCases([...useCases, ""]);
  };

  const handleRemoveUseCase = (index) => {
    const updatedUseCases = useCases.filter((_, i) => i !== index);
    setUseCases(updatedUseCases);
  };

  // Create a single object for navConfig
  const navConfig = { logo, useCases, cta: { text: ctaText, link: ctaLink } };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (Edit Options) */}
        <div className="col-span-4">
          <h2 className="text-2xl font-bold mb-4">Configure TopNav</h2>

          {/* Logo Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Logo URL:</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Use Cases */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Use Cases:</label>
            {useCases.map((useCase, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  value={useCase}
                  onChange={(e) => handleUseCaseChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder={`Use Case ${index + 1}`}
                />
                <button
                  onClick={() => handleRemoveUseCase(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddUseCase}
              className="bg-green-600 text-white px-4 py-2 rounded-md mt-2"
            >
              Add Use Case
            </button>
          </div>

          {/* CTA Button */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">CTA Text:</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">CTA Link:</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!hasChanges} // Disable the button if no changes were made
            className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition ${!hasChanges ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Save Changes
          </button>
        </div>

        {/* Right Column (Preview) */}
        <div className="col-span-8">
          <h2 className="text-2xl font-bold mb-4">Preview TopNav</h2>
          <TopNav config={navConfig} />
        </div>
      </div>
    </div>
  );
};

export default NavUpdate;
