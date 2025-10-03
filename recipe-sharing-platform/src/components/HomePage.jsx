import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Recipe Sharing Platform 🍴
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{recipe.summary}</p>
              <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-blue-500 font-medium hover:underline"
                    >
                    View Recipe →
                </Link>
            <div className="text-center mb-6">
                <Link
                    to="/add-recipe"
                    className="inline-block bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-600 transition duration-300"
                >
                    ➕ Add New Recipe
                </Link>
            </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
