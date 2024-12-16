import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../Constant";

// Custom Card Components
const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-lg border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 ${className}`}>
    {children}
  </div>
);

// SVG Icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h4v7H4v-7zM10 10h4v11h-4V10zM16 3h4v18h-4V3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [totalSites, setTotalSites] = useState(0);
  const [recentUpdates, setRecentUpdates] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  useEffect(() => {
    const fetchSitesCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sites`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalSites(data.length);
          setRecentUpdates(Math.floor(Math.random() * data.length) + 1);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitesCount();
  }, []);

  const stats = [
    { label: 'Total Sites', value: loading ? '...' : totalSites.toString() },
    { label: 'Recent Updates', value: loading ? '...' : recentUpdates.toString() }
  ];

  const quickAccessTools = [
    { icon: <ChartIcon />, title: 'Analytics', description: 'View site performance metrics and visitor insights' },
    { icon: <SettingsIcon />, title: 'Settings', description: 'Configure global settings and preferences' },
    { icon: <ActivityIcon />, title: 'Recent Activity', description: 'Track recent changes and updates' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Stats Bar */}
      <div className="bg-white border-b py-4 px-6 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FD7149]">Welcome back, Admin</h1>
          <div className="flex gap-6">
            {stats.map((stat) => (
              <div key={stat.label} 
                className={`text-center transition-opacity duration-300 ${loading ? 'animate-pulse' : ''}`}
              >
                <p className="text-2xl font-bold text-[#FD7149]">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card 
            className="group hover:shadow-lg transition-all duration-300 border hover:border-[#FD7149] cursor-pointer"
            onClick={() => navigate('/createsite')}
            onMouseEnter={() => setHoveredCard('create')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-[#FD7149] group-hover:scale-110 transition-transform">
                  <PlusIcon />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FD7149]">
                  <ArrowIcon />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#FD7149] transition-colors">Create New Site</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Launch a new website with our intuitive site builder. Configure features,
                design, and settings in minutes.
              </p>
              <button
                onClick={() => navigate('/createsite')}
                className="w-full bg-[#FD7149] text-white py-3 rounded-lg hover:bg-[#e56642] transition-colors"
              >
                Start Building
              </button>
            </CardContent>
          </Card>

          <Card 
            className="group hover:shadow-lg transition-all duration-300 border hover:border-[#FD7149] cursor-pointer"
            onClick={() => navigate('/listsite')}
            onMouseEnter={() => setHoveredCard('manage')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-[#FD7149] group-hover:scale-110 transition-transform">
                  <ListIcon />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FD7149]">
                  <ArrowIcon />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#FD7149] transition-colors">Manage Sites</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View, edit, and manage all your existing websites. Monitor performance
                and make updates easily.
              </p>
              <button
                onClick={() => navigate('/listsite')}
                className="w-full bg-[#FD7149] text-white py-3 rounded-lg hover:bg-[#e56642] transition-colors"
              >
                View Sites
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickAccessTools.map((tool) => (
            <Card 
              key={tool.title} 
              className="hover:shadow-md transition-all duration-300 border hover:border-[#FD7149] cursor-pointer group"
            >
              <CardHeader>
                <div className="text-[#FD7149] mb-2 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FD7149] transition-colors">
                  {tool.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;