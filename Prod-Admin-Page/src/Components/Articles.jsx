import React from "react";

const Articles = ({ articles }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-center text-4xl mb-6">Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <img
              src={article.image}
              alt={`Article ${index + 1}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-gray-600 mt-2">{article.content}</p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                {article.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
