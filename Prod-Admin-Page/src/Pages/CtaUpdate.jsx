import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../Constant';
import { useAuth } from '../Auth/UseAuth';

const CtaUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  // State management
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    button: {
      text: '',
      link: ''
    },
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState('POST');

  // Fetch CTA data
  useEffect(() => {
    const fetchCtaConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cta`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'siteid': id
          },
        });

        if (response.status === 404) {
          setSaveType('POST');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch CTA configuration');
        }

        const data = await response.json();
        if (data.ctaConfig) {
          setFormData(data.ctaConfig);
          setSaveType('PUT');
        }
      } catch (error) {
        console.error('Error fetching CTA:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCtaConfig();
  }, [id]);

  // Handle form changes
  const handleChange = (e, buttonField = false) => {
    setHasChanges(true);

    if (buttonField) {
      setFormData(prev => ({
        ...prev,
        button: {
          ...prev.button,
          [e.target.name]: e.target.value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  // Save changes
  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cta`, {
        method: saveType,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'siteid': id
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} CTA configuration`);

      const result = await response.json();
      alert(result.message);
      setHasChanges(false);
      setSaveType('PUT');
    } catch (error) {
      console.error('Error saving CTA:', error);
      alert('Failed to save changes');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">CTA Configuration</h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="text"
                value={formData.button.text}
                onChange={(e) => handleChange(e, true)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                name="link"
                value={formData.button.link}
                onChange={(e) => handleChange(e, true)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-6 py-2 rounded-md text-white transition-colors ${hasChanges
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {saveType === 'POST' ? 'Create' : 'Update'}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Live Preview</h2>
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="relative rounded-xl overflow-hidden">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="CTA"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                    e.target.alt = 'Image not found';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-6 max-w-xl">
                  <h3 className="text-3xl font-bold mb-4">
                    {formData.heading || 'Your Heading Here'}
                  </h3>
                  <p className="text-lg mb-6">
                    {formData.content || 'Your content here...'}
                  </p>
                  {(formData.button?.text || formData.button?.link) && (
                    <a
                      href={formData.button?.link || '#'}
                      className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
                    >
                      {formData.button?.text || 'Click Here'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaUpdate;