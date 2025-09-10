import { create } from 'zustand';

// Create the Zustand store for managing recipes
const useRecipeStore = create((set) => ({
  // Initial state: empty array of recipes
  recipes: [],
  
  // Action to add a new recipe to the store
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, newRecipe] 
    })),
  
  // Action to set/replace all recipes (useful for initialization)
  setRecipes: (recipes) => 
    set({ recipes }),
  
  // Action to delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id)
    })),
  
  // Action to update a specific recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }))
}));

export default useRecipeStore;