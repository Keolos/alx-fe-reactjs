import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({}); // field-level errors

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Please provide ingredients.";
    } else {
      const list = ingredients.split("\n").filter((i) => i.trim() !== "");
      if (list.length < 2) {
        newErrors.ingredients = "Please enter at least two ingredients.";
      }
    }

    if (!steps.trim()) {
      newErrors.steps = "Please provide preparation steps.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
      instructions: steps.split("\n").filter((s) => s.trim() !== ""),
    };

    console.log("✅ Recipe Submitted:", newRecipe);

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-10 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Add a New Recipe 🍲
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-lg md:max-w-2xl mx-auto"
      >
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
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
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
            className={`w-full border rounded-lg px-4 py-2 h-32 md:h-40 focus:outline-none focus:ring-2 ${
              errors.ingredients
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
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
            className={`w-full border rounded-lg px-4 py-2 h-40 md:h-52 focus:outline-none focus:ring-2 ${
              errors.steps
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 md:py-4"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
