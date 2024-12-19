import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";
import { useAuth } from "../Auth/UseAuth";
import * as Icons from "lucide-react";

const OfferUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    heading: "What Do We Offer?",
    selectedOffer: "1",
    cards: []
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Icon options from lucide-react
  const iconOptions = [
    "BarChart2", "Bot", "FileText", "LineChart", "PieChart", 
    "Activity", "AlertCircle", "Archive", "Award", "Bell",
    "Bookmark", "Calendar", "Camera", "Check", "Clock"
  ];

  // Fetch initial offer configuration
  useEffect(() => {
    const fetchOfferConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/offer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          if (data) {
            setFormData({
              heading: data.heading || "What Do We Offer?",
              selectedOffer: data.selectedOffer || "1",
              cards: data.cards || []
            });
            setSaveType("PUT");
          }
        } else {
          setSaveType("POST");
        }
      } catch (error) {
        console.warn("No existing offer configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchOfferConfig();
  }, [id, token]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData]);

  const handleAddCard = () => {
    setFormData(prev => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          icon: "BarChart2",
          title: "New Card",
          content: "Enter card content here"
        }
      ]
    }));
  };

  const handleRemoveCard = (index) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
  };

  const handleCardChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.map((card, i) => 
        i === index ? { ...card, [field]: value } : card
      )
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/offer`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} offer configuration`);

      const result = await response.json();
      setHasChanges(false);
      alert(`Offer configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT");
    } catch (error) {
      console.error(`Error saving offer configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Editor Section */}
      <div className="w-full md:w-1/2">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Update Offer Section</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Heading:</label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => setFormData(prev => ({ ...prev, heading: e.target.value }))}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Selected Offer:</label>
              <input
                type="text"
                value={formData.selectedOffer}
                onChange={(e) => setFormData(prev => ({ ...prev, selectedOffer: e.target.value }))}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">Offer Cards:</label>
                <button
                  onClick={handleAddCard}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Add Card
                </button>
              </div>

              {formData.cards.map((card, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Card {index + 1}</h3>
                    <button
                      onClick={() => handleRemoveCard(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm">Icon:</label>
                    <select
                      value={card.icon}
                      onChange={(e) => handleCardChange(index, "icon", e.target.value)}
                      className="border p-2 w-full rounded-md"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm">Title:</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardChange(index, "title", e.target.value)}
                      className="border p-2 w-full rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm">Content:</label>
                    <textarea
                      value={card.content}
                      onChange={(e) => handleCardChange(index, "content", e.target.value)}
                      className="border p-2 w-full rounded-md h-24"
                    />
                  </div>
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
      <div className="w-full md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center text-gray-900">{formData.heading}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.cards.map((card, index) => {
                const IconComponent = Icons[card.icon];
                return (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-sm">
                    {IconComponent && (
                      <div className="mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferUpdate;