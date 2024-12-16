import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Kpi from "../components/Kpi"; // Import the Kpi component for live preview

const KpiUpdate = ({ kpiSection = { heading: {}, kpis: [] }, setKpiSection }) => {
  const navigate = useNavigate();
  const [editedKpiSection, setEditedKpiSection] = useState({ ...kpiSection });

  const handleInputChange = (field, value) => {
    setEditedKpiSection((prev) => ({
      ...prev,
      heading: { ...prev.heading, [field]: value },
    }));
  };

  const handleKpiChange = (index, field, value) => {
    const updatedKpis = [...editedKpiSection.kpis];
    updatedKpis[index][field] = value;
    setEditedKpiSection((prev) => ({ ...prev, kpis: updatedKpis }));
  };

  const addKpi = () => {
    setEditedKpiSection((prev) => ({
      ...prev,
      kpis: [...prev.kpis, { title: "New KPI", counter: 0, unit: "Percentage" }],
    }));
  };

  const deleteKpi = (index) => {
    const updatedKpis = editedKpiSection.kpis.filter((_, i) => i !== index);
    setEditedKpiSection((prev) => ({ ...prev, kpis: updatedKpis }));
  };

  const saveChanges = () => {
    setKpiSection(editedKpiSection);
    navigate("/");  // Navigate to the desired page after saving
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      {/* Left Side: Editing Section */}
      <div className="col-span-12 md:col-span-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update KPI Section</h2>
        <label className="block mb-4">
          <span className="text-sm font-medium">Title:</span>
          <input
            type="text"
            className="border p-2 w-full mt-1"
            value={editedKpiSection.heading?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium">Description:</span>
          <textarea
            className="border p-2 w-full mt-1"
            value={editedKpiSection.heading?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </label>

        <button
          onClick={addKpi}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add KPI
        </button>

        <ul>
          {editedKpiSection.kpis.map((kpi, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={kpi.title || ""}
                onChange={(e) => handleKpiChange(index, "title", e.target.value)}
                className="border p-2 w-full"
              />
              <input
                type="number"
                value={kpi.counter || 0}
                onChange={(e) => handleKpiChange(index, "counter", parseInt(e.target.value))}
                className="border p-2 w-20 ml-2"
              />
              <select
                value={kpi.unit}
                onChange={(e) => handleKpiChange(index, "unit", e.target.value)}
                className="border p-2 ml-2"
              >
                <option value="Percentage">Percentage</option>
                <option value="Seconds">Seconds</option>
              </select>
              <button
                onClick={() => deleteKpi(index)}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={saveChanges}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </div>

      {/* Right Side: Preview Section */}
      <div className="col-span-12 md:col-span-8 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <Kpi kpiConfig={editedKpiSection} />
      </div>
    </div>
  );
};

export default KpiUpdate;
