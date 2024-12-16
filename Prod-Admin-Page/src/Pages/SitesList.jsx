import { useEffect, useState } from "react";
import { BASE_URL } from "../Constant";

const SitesList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY"; // Replace with your actual token

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sites`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Include Bearer token in the request header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSites(data); // Assuming the API response is an array of sites
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading sites...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sites List
        </h1>

        <div className="space-y-6">
          {sites.map((site) => (
            <div
              key={site._id}
              className="border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{site.siteName}</h2>
              <p className="text-gray-600 text-sm mt-1">{site.description}</p>

              <div className="mt-4 text-sm text-gray-500">
                <p className="mb-2">
                  <strong>Metadata Description:</strong> {site.metadata.description}
                </p>
                <p className="mb-2">
                  <strong>Metadata URL:</strong>{" "}
                  <a
                    href={site.metadata.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {site.metadata.url}
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Logo:</strong>
                  <img
                    src={site.metadata.logo}
                    alt="Site Logo"
                    className="w-16 h-16 object-contain mt-2 rounded-md shadow-md"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitesList;
