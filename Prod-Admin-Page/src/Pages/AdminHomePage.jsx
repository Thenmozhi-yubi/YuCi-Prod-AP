
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        {/* Create Site Card */}
        <div
          onClick={() => navigate("/createsite")}
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition cursor-pointer p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Site</h2>
          <p className="text-gray-600 text-sm">
            Start building a new site by configuring its features and settings.
          </p>
        </div>

        {/* List Sites Card */}
        <div
          onClick={() => navigate("/listsite")}
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition cursor-pointer p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">List Sites</h2>
          <p className="text-gray-600 text-sm">
            View and manage all existing sites you’ve created.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
