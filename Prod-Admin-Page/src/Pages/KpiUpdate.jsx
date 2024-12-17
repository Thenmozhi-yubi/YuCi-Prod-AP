import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";
import Kpi from "../components/Kpi";

const KpiUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [editedKpiSection, setEditedKpiSection] = useState({
    heading: {},
    kpis: []
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial KPI configuration
  useEffect(() => {
    const fetchKpiConfig = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/kpi`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch KPI configuration");
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Populate fields if data exists
          setEditedKpiSection({
            heading: data.heading || {},
            kpis: data.kpis || []
          });
          setSaveType("PUT"); // Switch to PUT since data exists
        } else {
          setSaveType("POST"); // No data found; use POST
        }
      } catch (error) {
        console.warn("No existing KPI configuration found. Switching to POST mode.");
        setSaveType("POST");
      } finally {
        setLoading(false);
      }
    };

    fetchKpiConfig();
  }, [id]);

  // Detect changes
  useEffect(() => {
    setHasChanges(true);
  }, [editedKpiSection]);

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

  const saveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/kpi`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify({
          heading: editedKpiSection.heading,
          kpis: editedKpiSection.kpis
        }),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} KPI configuration`);

      setHasChanges(false);
      alert(`KPI configuration ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // Switch to PUT after successful POST
    } catch (error) {
      console.error(`Error saving KPI configuration:`, error);
      alert(`Failed to ${saveType} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      {/* Left Side: Editing Section */}
      <div className="col-span-12 md:col-span-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update KPI Section</h2>
        <label className="block mb-4">
          <span className="text-sm font-medium">Title:</span>
          <input
            type="text"
            className="border p-2 w-full mt-1 rounded-md"
            value={editedKpiSection.heading?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium">Description:</span>
          <textarea
            className="border p-2 w-full mt-1 rounded-md"
            value={editedKpiSection.heading?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </label>

        <button
          onClick={addKpi}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mb-4"
        >
          Add KPI
        </button>

        <ul className="space-y-4">
          {editedKpiSection.kpis.map((kpi, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow">
              <div className="space-y-2">
                <input
                  type="text"
                  value={kpi.title || ""}
                  onChange={(e) => handleKpiChange(index, "title", e.target.value)}
                  className="border p-2 w-full rounded-md"
                  placeholder="KPI Title"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={kpi.counter || 0}
                    onChange={(e) => handleKpiChange(index, "counter", parseInt(e.target.value))}
                    className="border p-2 w-24 rounded-md"
                    min="0"
                  />
                  <select
                    value={kpi.unit}
                    onChange={(e) => handleKpiChange(index, "unit", e.target.value)}
                    className="border p-2 rounded-md"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Seconds">Seconds</option>
                  </select>
                  <button
                    onClick={() => deleteKpi(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-6">
          <button
            onClick={saveChanges}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-md text-white transition ${
              hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {saveType === "POST" ? "Create" : "Save Changes"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
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