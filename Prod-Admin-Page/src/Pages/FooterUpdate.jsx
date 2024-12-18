import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../Constant";
import Footer from '../components/Footer';

const FooterUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [config, setConfig] = useState({
    logo: '',
    content: '',
    socialImages: [],
    buttons: [],
    products: { title: '', links: [] },
    company: { title: '', links: [] },
    resources: { title: '', links: [] },
    security: { title: '', links: [] },
    help: { title: '', links: [] },
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial footer configuration
  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/footer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch footer configuration");
        }

        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setConfig(data);
          setSaveType("PUT"); // Data exists, so we'll use PUT
        } else {
          setSaveType("POST"); // No data, so we'll use POST
        }
      } catch (error) {
        console.warn("No existing footer configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    if (!loading) {
      setHasChanges(true);
    }
  }, [config, loading]);

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (sectionName, field, value) => {
    setConfig(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], [field]: value },
    }));
  };

  const handleLinkChange = (sectionName, index, field, value) => {
    const updatedLinks = [...config[sectionName].links];
    updatedLinks[index][field] = value;
    setConfig(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], links: updatedLinks },
    }));
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...config.buttons];
    updatedButtons[index][field] = value;
    setConfig(prev => ({ ...prev, buttons: updatedButtons }));
  };

  const addButton = () => {
    setConfig(prev => ({
      ...prev,
      buttons: [...prev.buttons, { text: '', link: '' }]
    }));
  };

  const removeButton = (index) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const addLink = (sectionName) => {
    setConfig(prev => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        links: [...prev[sectionName].links, { text: '', url: '' }]
      }
    }));
  };

  const removeLink = (sectionName, index) => {
    setConfig(prev => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        links: prev[sectionName].links.filter((_, i) => i !== index)
      }
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/footer`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} footer configuration`);

      const data = await response.json();
      setConfig(data.data);
      setHasChanges(false);
      alert(`Footer configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // After successful POST, switch to PUT for future saves
      navigate('/');
    } catch (error) {
      console.error(`Error ${saveType === "POST" ? "creating" : "updating"} footer configuration:`, error);
      alert(`Failed to ${saveType.toLowerCase()} changes.`);
    }
  };

  const renderSectionEditor = (sectionName, sectionTitle) => (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-lg font-semibold mb-2">{sectionTitle}</h3>
      <input
        type="text"
        placeholder="Section Title"
        value={config[sectionName].title}
        onChange={(e) => handleSectionChange(sectionName, 'title', e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      {config[sectionName].links.map((link, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Link Text"
            value={link.text}
            onChange={(e) => handleLinkChange(sectionName, index, 'text', e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Link URL"
            value={link.url}
            onChange={(e) => handleLinkChange(sectionName, index, 'url', e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
          <button
            onClick={() => removeLink(sectionName, index)}
            className="text-red-500 text-sm hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addLink(sectionName)}
        className="text-blue-500 text-sm hover:text-blue-700"
      >
        + Add Link
      </button>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Editing Panel */}
      <div className="col-span-12 md:col-span-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h1 className="text-xl font-bold mb-6">Edit Footer</h1>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Logo URL</label>
              <input
                type="text"
                value={config.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Footer Content</label>
              <textarea
                value={config.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full border p-2 rounded-md min-h-[100px]"
              />
            </div>

            {/* Buttons Editor */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Buttons</h3>
              {config.buttons.map((button, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={button.text}
                    onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                    className="w-1/2 border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Button Link"
                    value={button.link}
                    onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
                    className="w-1/2 border p-2 rounded-md"
                  />
                  <button
                    onClick={() => removeButton(index)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addButton}
                className="text-blue-500 text-sm hover:text-blue-700"
              >
                + Add Button
              </button>
            </div>

            {renderSectionEditor('products', 'Products')}
            {renderSectionEditor('company', 'Company')}
            {renderSectionEditor('resources', 'Resources')}
            {renderSectionEditor('security', 'Security')}
            {renderSectionEditor('help', 'Help')}

            <div className="flex gap-4">
              <button
                onClick={saveChanges}
                disabled={!hasChanges}
                className={`px-6 py-3 rounded-md text-white transition flex-1 ${
                  hasChanges ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {saveType === "POST" ? "Create Footer" : "Save Changes"}
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

      {/* Preview Panel */}
      <div className="col-span-12 md:col-span-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Footer Preview</h2>
          <Footer footerConfig={config} />
        </div>
      </div>
    </div>
  );
};

export default FooterUpdate;