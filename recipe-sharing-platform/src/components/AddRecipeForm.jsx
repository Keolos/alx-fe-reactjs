import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !ingredients || !steps) {
      setError("⚠️ All fields are required!");
      return;
    }

    // Ensure ingredients has at least 2 items
    const ingredientsList = ingredients.split("\n").filter((i) => i.trim() !== "");
    if (ingredientsList.length < 2) {
      setError("⚠️ Please provide at least two ingredients.");
      return;
    }

    setError(""); // Clear error if validation passes

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientsList,
      instructions: steps.split("\n").filter((s) => s.trim() !== ""),
    };

    console.log("✅ Recipe Submitted:", newRecipe);

    // Reset form after submission
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add a New Recipe 🍲
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto"
      >
        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
        )}

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            placeholder="Enter ingredients, each on a new line"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Steps */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Preparation Steps (one per line)
          </label>
          <textarea
            placeholder="Enter preparation steps, each on a new line"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
