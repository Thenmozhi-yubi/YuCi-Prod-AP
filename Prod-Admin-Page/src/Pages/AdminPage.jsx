import { useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the 'id' from the URL

  const handleNavigation = (path) => {
    navigate(`${path}/${id}`); // Pass the id to the route
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-8">
      {/* Page Header */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Admin Panel for Site {id}</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* TopNav Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/topnav")}
        >
          <h3 className="text-xl font-semibold text-gray-800">TopNav</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the top navigation bar.
          </p>
        </div>

        {/* Hero Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/hero")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Hero</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the hero section.
          </p>
        </div>

        {/* Feature Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/feature")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Feature</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the feature section.
          </p>
        </div>

        {/* KPI Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/kpi")}
        >
          <h3 className="text-xl font-semibold text-gray-800">KPI</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the KPI section.
          </p>
        </div>

        {/* Video Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/video")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Video</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the video section.
          </p>
        </div>

        {/* Trust Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/trust")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Trust</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the trust section.
          </p>
        </div>

        {/* Article Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/article")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Article</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the article section.
          </p>
        </div>

        {/* Footer Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/footer")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Footer</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the footer section.
          </p>
        </div>

        {/* CTA Card */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition p-6 cursor-pointer"
          onClick={() => handleNavigation("/admin/cta")}
        >
          <h3 className="text-xl font-semibold text-gray-800">CTA</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure the call-to-action section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
