import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../components/TopNav"; // Import the TopNav component for live preview
import { BASE_URL } from "../Constant";
import { useAuth } from "../Auth/UseAuth";

const NavUpdate = () => {
  const { id } = useParams();
  const [logo, setLogo] = useState("");
  const [useCases, setUseCases] = useState([]);
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(false); // Flag to track if this is a new entry
  const navigate = useNavigate();
 const {token} = useAuth()

  // Load the config from the API on initial mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/topnav`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const topNavConfig = data[0]; // Assuming the first item in the array
            setLogo(topNavConfig.Logo_URL || "");
            setUseCases(topNavConfig.use_cases || []);
            setCtaText(topNavConfig.CTA_Text || "");
            setCtaLink(topNavConfig.CTA_Link || "");
          } else {
            setIsNew(true); // Set to true if no data exists
          }
        }
      } catch (error) {
        console.error("Error fetching topnav configuration:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [id]);

  const hasChanges =
    logo !== "" ||
    useCases.length > 0 ||
    ctaText !== "" ||
    ctaLink !== "";

  const handleSave = async () => {
    const updatedConfig = {
      Logo_URL: logo,
      use_cases: useCases,
      CTA_Text: ctaText,
      CTA_Link: ctaLink,
    };

    try {
      let response;
      if (isNew) {
        // If it's a new entry, use POST to create
        response = await fetch(`${BASE_URL}/api/topnav`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "siteid": id,
          },
          body: JSON.stringify(updatedConfig),
        });
      } else {
        // If data exists, use PUT to update
        response = await fetch(`${BASE_URL}/api/topnav`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "siteid": id,
          },
          body: JSON.stringify(updatedConfig),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(isNew ? "TopNav created" : "TopNav updated", data);
        alert("Updated Successfully");
      } else {
        throw new Error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving TopNav configuration:", error);
      alert("Error saving TopNav configuration");
    }
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

  const navConfig = { logo, useCases, cta: { text: ctaText, link: ctaLink } };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

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
