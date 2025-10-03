import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((r) => r.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Loading recipe...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Cooking Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              {recipe.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
