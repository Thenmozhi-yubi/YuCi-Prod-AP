import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Articles from "../components/Articles";

const ArticlesUpdate = ({ articles, setArticles }) => {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    image: "",
    buttonText: "",
  });
  const [currentEditIndex, setCurrentEditIndex] = useState(null); // Track the article being edited
  const navigate = useNavigate();

  // Add a new article
  const handleAddArticle = () => {
    setArticles([...articles, newArticle]);
    setNewArticle({ title: "", content: "", image: "", buttonText: "" });
  };

  // Update an existing article
  const handleUpdateArticle = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index] = newArticle;
    setArticles(updatedArticles);
  };

  // Delete an article from the list
  const handleDeleteArticle = (index) => {
    const updatedArticles = articles.filter((_, idx) => idx !== index); // Remove the article by index
    setArticles(updatedArticles);

    // If the deleted article was the one being edited, reset the form
    if (currentEditIndex === index) {
      setNewArticle({ title: "", content: "", image: "", buttonText: "" });
      setCurrentEditIndex(null); // Clear the current edit index
    }
  };

  // Save changes when editing an article
  const saveChanges = () => {
    // This function can be used to handle saving any changes made in the form
    if (currentEditIndex !== null) {
      handleUpdateArticle(currentEditIndex);  // Save the changes to the article being edited
    }
    navigate("/");  // Navigate to the desired page (e.g., homepage or another route) after saving
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-4xl mb-8">Update Articles</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Section: Edit/Add Article Form */}
        <div className="col-span-12 lg:col-span-4">
          <h3 className="text-2xl font-bold mb-4">Edit/Add Article</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Content</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, content: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newArticle.image}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, image: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Button Text</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newArticle.buttonText}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, buttonText: e.target.value })
                }
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddArticle}
            >
              Add Article
            </button>
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </div>
          {/* List of articles with remove buttons */}
          <div className="mt-6">
            {articles.map((article, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <h4 className="font-bold">{article.title}</h4>
                  <p>{article.content}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteArticle(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Preview of Articles */}
        <div className="col-span-12 lg:col-span-8">
          <h3 className="text-2xl font-bold mb-4">Preview Articles</h3>
          <Articles
            articles={articles}
            handleDeleteArticle={handleDeleteArticle}
            setNewArticle={setNewArticle}
            currentEditIndex={currentEditIndex}
            setCurrentEditIndex={setCurrentEditIndex} // Pass the setter function
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlesUpdate;
    