import { create } from 'zustand';

// Create the Zustand store for managing recipes
const useRecipeStore = create((set, get) => ({
  // Initial state: empty array of recipes
  recipes: [],
  
  // State for selected recipe (for details view)
  selectedRecipe: null,
  
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
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      // Clear selected recipe if it's the one being deleted
      selectedRecipe: state.selectedRecipe?.id === id ? null : state.selectedRecipe
    })),
  
  // Action to update a specific recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
      // Update selected recipe if it's the one being updated
      selectedRecipe: state.selectedRecipe?.id === updatedRecipe.id 
        ? updatedRecipe 
        : state.selectedRecipe
    })),
  
  // Action to get a recipe by ID
  getRecipeById: (id) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === parseInt(id));
  },
  
  // Action to set selected recipe
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  
  // Action to clear selected recipe
  clearSelectedRecipe: () => set({ selectedRecipe: null }),
  
  // Action to search recipes
  searchRecipes: (searchTerm) => {
    const state = get();
    if (!searchTerm.trim()) return state.recipes;
    
    return state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}));

export default useRecipeStore;