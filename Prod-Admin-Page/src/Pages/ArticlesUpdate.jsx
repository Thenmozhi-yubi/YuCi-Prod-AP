import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";
import Articles from "../components/Articles";

const ArticlesUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    image: "",
    buttonText: "",
  });
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveType, setSaveType] = useState("POST");

  // Fetch initial articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/articles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "siteid": id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setArticles(data);
          setSaveType("PUT"); // Data exists, so we'll use PUT
        } else {
          setSaveType("POST"); // No data, so we'll use POST
        }
      } catch (error) {
        console.warn("No existing articles found or error fetching:", error);
        setArticles([]);
        setSaveType("POST"); // Error or no data, use POST
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  // Detect changes
  useEffect(() => {
    if (!loading) { // Only set hasChanges after initial load
      setHasChanges(true);
    }
  }, [articles, loading]);

  const handleAddArticle = () => {
    if (!newArticle.title.trim()) {
      alert("Please enter a title for the article");
      return;
    }
    setArticles(prev => [...prev, newArticle]);
    setNewArticle({ title: "", content: "", image: "", buttonText: "" });
  };

  const handleUpdateArticle = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index] = newArticle;
    setArticles(updatedArticles);
    setCurrentEditIndex(null);
    setNewArticle({ title: "", content: "", image: "", buttonText: "" });
  };

  const handleDeleteArticle = (index) => {
    setArticles(prev => prev.filter((_, idx) => idx !== index));
    if (currentEditIndex === index) {
      setNewArticle({ title: "", content: "", image: "", buttonText: "" });
      setCurrentEditIndex(null);
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/articles`, {
        method: saveType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "siteid": id,
        },
        body: JSON.stringify({ articles }),
      });

      if (!response.ok) throw new Error(`Failed to ${saveType} articles`);

      const data = await response.json();
      setArticles(data.data || []);
      setHasChanges(false);
      alert(`Articles ${saveType === "POST" ? "created" : "updated"} successfully!`);
      setSaveType("PUT"); // After successful POST, switch to PUT for future saves
    } catch (error) {
      console.error(`Error ${saveType === "POST" ? "creating" : "updating"} articles:`, error);
      alert(`Failed to ${saveType.toLowerCase()} changes.`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-center text-4xl mb-8 font-bold">Update Articles</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Section: Edit/Add Article Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-6">
              {currentEditIndex !== null ? "Edit Article" : "Add New Article"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content</label>
                <textarea
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newArticle.image}
                  onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Button Text</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newArticle.buttonText}
                  onChange={(e) => setNewArticle({ ...newArticle, buttonText: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex-1"
                  onClick={currentEditIndex !== null ? () => handleUpdateArticle(currentEditIndex) : handleAddArticle}
                >
                  {currentEditIndex !== null ? "Update Article" : "Add Article"}
                </button>
                {currentEditIndex !== null && (
                  <button
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                    onClick={() => {
                      setCurrentEditIndex(null);
                      setNewArticle({ title: "", content: "", image: "", buttonText: "" });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-bold text-lg">Current Articles</h4>
              {articles.map((article, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow">
                  <h4 className="font-bold">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition text-sm"
                      onClick={() => {
                        setNewArticle(article);
                        setCurrentEditIndex(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm"
                      onClick={() => handleDeleteArticle(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={saveChanges}
                disabled={!hasChanges}
                className={`px-6 py-3 rounded-md text-white transition flex-1 ${
                  hasChanges ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {saveType === "POST" ? "Create Articles" : "Save Changes"}
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Preview */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-6">Preview Articles</h3>
            <Articles
              articles={articles}
              handleDeleteArticle={handleDeleteArticle}
              setNewArticle={setNewArticle}
              currentEditIndex={currentEditIndex}
              setCurrentEditIndex={setCurrentEditIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesUpdate;