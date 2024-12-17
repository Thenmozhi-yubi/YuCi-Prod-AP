import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constant";
import { useAuth } from "../Auth/UseAuth";

const LoadingCard = () => (
  <div className="border border-gray-200 p-6 rounded-lg animate-pulse">
    <div className="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-50 rounded w-full mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-50 rounded w-5/6"></div>
      <div className="h-4 bg-gray-50 rounded w-4/6"></div>
    </div>
  </div>
);

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-8">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
                 focus:ring-2 focus:ring-[#FD7149] focus:ring-opacity-20 focus:border-[#FD7149]
                 placeholder-gray-400 transition-all duration-200"
      placeholder="Search sites by name, description, or meta tags..."
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const SiteCard = ({ site }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    navigate(`/site/${site.siteId}`); // Use `id` from the payload
  };

  return (
    <div
      onClick={handleCardClick} // Navigate when card is clicked
      className="group relative overflow-hidden border border-gray-200 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FD7149] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#FD7149] transition-colors duration-300">
              {site.siteName}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-2">{site.description}</p>
          </div>
          
          <div className="ml-4 relative w-16 h-16">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg animate-pulse"></div>
            )}
            <img
              src={site.metadata.logo}
              alt={`${site.siteName} logo`}
              className={`w-16 h-16 object-contain rounded-lg shadow-sm transition-all duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Meta Description</h3>
            <p className={`text-gray-600 text-sm transition-all duration-300 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}>
              {site.metadata.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href={site.metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#FD7149] hover:text-[#e56642] transition-colors duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking Visit Site
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SitesList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

 const {token} = useAuth()

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sites`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data",data);
          setSites(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch sites");
        }
      } catch (error) {
        setError("An error occurred while fetching sites.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  const filteredSites = sites.filter(site => {
    const searchLower = searchTerm.toLowerCase();
    return (
      site.siteName.toLowerCase().includes(searchLower) ||
      site.description.toLowerCase().includes(searchLower) ||
      site.metadata.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#FD7149] mb-4">Your Sites</h1>
          <p className="text-gray-600">Manage and monitor all your websites in one place</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setSearchTerm} />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((n) => (
              <LoadingCard key={n} />
            ))}
          </div>
        ) : (
          /* Sites Grid */
          <div className="grid grid-cols-1 gap-6">
            {filteredSites.map((site) => (
              <SiteCard key={site._id} site={site} />
            ))}
          </div>
        )}

        {/* Empty or No Results State */}
        {!loading && !error && filteredSites.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600">
              {searchTerm ? 'No sites match your search criteria' : 'No sites found. Start by creating a new site!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitesList;
