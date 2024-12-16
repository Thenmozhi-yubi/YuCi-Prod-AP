import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const FooterUpdate = ({ footerConfig, setFooterConfig }) => {
  const [config, setConfig] = useState(footerConfig || {
    logo: '',
    content: '',
    socialImages: [],
    buttons: [], // Buttons array
    products: { title: '', links: [] },
    company: { title: '', links: [] },
    resources: { title: '', links: [] },
    security: { title: '', links: [] },
    help: { title: '', links: [] },
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('footerConfig', JSON.stringify(config));
    setFooterConfig(config);
  }, [config, setFooterConfig]);

  const handleInputChange = (field, value) => {
    setConfig({ ...config, [field]: value });
  };

  const handleSectionChange = (sectionName, field, value) => {
    setConfig({
      ...config,
      [sectionName]: { ...config[sectionName], [field]: value },
    });
  };

  const handleLinkChange = (sectionName, index, field, value) => {
    const updatedLinks = [...config[sectionName].links];
    updatedLinks[index][field] = value;
    setConfig({
      ...config,
      [sectionName]: { ...config[sectionName], links: updatedLinks },
    });
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...config.buttons];
    updatedButtons[index][field] = value;
    setConfig({ ...config, buttons: updatedButtons });
  };

  const addButton = () => {
    const updatedButtons = [...config.buttons, { text: '', link: '' }];
    setConfig({ ...config, buttons: updatedButtons });
  };

  const removeButton = (index) => {
    const updatedButtons = config.buttons.filter((_, i) => i !== index);
    setConfig({ ...config, buttons: updatedButtons });
  };

  const addLink = (sectionName) => {
    const updatedLinks = [...config[sectionName].links, { text: '', url: '' }];
    setConfig({
      ...config,
      [sectionName]: { ...config[sectionName], links: updatedLinks },
    });
  };

  const removeLink = (sectionName, index) => {
    const updatedLinks = config[sectionName].links.filter((_, i) => i !== index);
    setConfig({
      ...config,
      [sectionName]: { ...config[sectionName], links: updatedLinks },
    });
  };

  const saveChanges = () => {
    navigate('/'); // Redirect to home page
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
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addLink(sectionName)}
        className="text-blue-500 text-sm"
      >
        + Add Link
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Editing Panel */}
      <div className="col-span-12 md:col-span-4">
        <h1 className="text-xl font-bold mb-4">Edit Footer</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Logo URL</label>
          <input
            type="text"
            value={config.logo || ''}
            onChange={(e) => handleInputChange('logo', e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Footer Content</label>
          <textarea
            value={config.content || ''}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Buttons Editor */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Buttons</h3>
          {config.buttons.map((button, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Button Text"
                value={button.text}
                onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                className="w-1/2 border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Button Link"
                value={button.link}
                onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
                className="w-1/2 border p-2 rounded"
              />
              <button
                onClick={() => removeButton(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addButton}
            className="text-blue-500 text-sm"
          >
            + Add Button
          </button>
        </div>

        {renderSectionEditor('products', 'Products')}
        {renderSectionEditor('company', 'Company')}
        {renderSectionEditor('resources', 'Resources')}
        {renderSectionEditor('security', 'Security')}
        {renderSectionEditor('help', 'Help')}

        <button
          onClick={saveChanges}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
        >
          Save Changes
        </button>
      </div>

      {/* Preview Panel */}
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-lg font-bold mb-4">Footer Preview</h2>
        <Footer footerConfig={config} />
      </div>
    </div>
  );
};

export default FooterUpdate;
