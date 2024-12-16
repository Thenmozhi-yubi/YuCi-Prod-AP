import { useParams } from "react-router-dom";
import { useState } from "react";
import NavUpdate from "../Pages/NavUpdate";
import HeroUpdate from "../Pages/HeroUpdate";
import FeatureUpdate from "../Pages/FeatureUpdate";
import KpiUpdate from "../Pages/KpiUpdate";
import VideoSectionUpdate from "../Pages/VideoSectionUpdate";
import TrustUpdate from "../Pages/TrustUpdate";
import ArticlesUpdate from "../Pages/ArticlesUpdate";
import FooterUpdate from "../Pages/FooterUpdate";
import CtaUpdate from "../Pages/CtaUpdate";

// Navigation items configuration
const navItems = [
  { id: 'topnav', label: 'Top Navigation', icon: 'M4 6h16M4 12h16M4 18h16' },
  { id: 'hero', label: 'Hero Section', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
  { id: 'feature', label: 'Features', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { id: 'kpi', label: 'KPI', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'video', label: 'Video Section', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { id: 'trust', label: 'Trust Section', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'article', label: 'Articles', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { id: 'footer', label: 'Footer', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { id: 'cta', label: 'Call to Action', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
];

const NavItem = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200
      ${isActive 
        ? 'bg-[#FD7149] text-white' 
        : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
    </svg>
    <span className="font-medium">{item.label}</span>
  </div>
);

// Content components for each section
const TopNavConfig = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Navigation Configuration</h2>
    {/* Add your TopNav configuration form/content here */}
  </div>
);

const HeroConfig = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Hero Section Configuration</h2>
    {/* Add your Hero configuration form/content here */}
  </div>
);

// Add similar components for other sections...

const AdminPage = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('topnav');

  // Function to render the appropriate content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'topnav':
        return <NavUpdate siteId={id} />;
      case 'hero':
        return <HeroUpdate siteId={id} />;
      case 'feature':
        return <FeatureUpdate siteId={id} />;
      case 'kpi':
        return <KpiUpdate siteId={id} />;
      case 'video':
        return <VideoSectionUpdate siteId={id} />;
      case 'trust':
        return <TrustUpdate siteId={id} />;
      case 'article':
        return <ArticlesUpdate siteId={id} />;
      case 'footer':
        return <FooterUpdate siteId={id} />;
      case 'cta':
        return <CtaUpdate siteId={id} />;
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {navItems.find(item => item.id === activeSection)?.label} Configuration
            </h2>
            <p className="text-gray-600">
              Configure your {navItems.find(item => item.id === activeSection)?.label.toLowerCase()} section here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Side Navigation */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#FD7149]">Site Settings</h2>
          <p className="text-sm text-gray-600 mt-1">ID: {id}</p>
        </div>
        <div className="divide-y divide-gray-100">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50">
        <div className="h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;