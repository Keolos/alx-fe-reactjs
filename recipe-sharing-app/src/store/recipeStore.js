import { create } from 'zustand';

// Create the Zustand store for managing recipes
const useRecipeStore = create((set, get) => ({
  // Initial state: empty array of recipes
  recipes: [],
  
  // State for selected recipe (for details view)
  selectedRecipe: null,
  
  // Search and filtering state
  searchTerm: '',
  filteredRecipes: [],
  filterCriteria: {
    preparationTime: '',
    difficulty: '',
    category: ''
  },
  
  // Action to add a new recipe to the store
  addRecipe: (newRecipe) => 
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes)
      };
    }),
  
  // Action to set/replace all recipes (useful for initialization)
  setRecipes: (recipes) => 
    set(() => ({
      recipes,
      filteredRecipes: get().applyFilters(recipes)
    })),
  
  // Action to delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes),
        // Clear selected recipe if it's the one being deleted
        selectedRecipe: state.selectedRecipe?.id === id ? null : state.selectedRecipe
      };
    }),
  
  // Action to update a specific recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes),
        // Update selected recipe if it's the one being updated
        selectedRecipe: state.selectedRecipe?.id === updatedRecipe.id 
          ? updatedRecipe 
          : state.selectedRecipe
      };
    }),
  
  // Action to set search term and filter recipes
  setSearchTerm: (term) => 
    set((state) => {
      const newState = { searchTerm: term };
      return {
        ...newState,
        filteredRecipes: get().applyFilters(state.recipes, term, state.filterCriteria)
      };
    }),
  
  // Action to set filter criteria
  setFilterCriteria: (criteria) =>
    set((state) => {
      const newCriteria = { ...state.filterCriteria, ...criteria };
      return {
        filterCriteria: newCriteria,
        filteredRecipes: get().applyFilters(state.recipes, state.searchTerm, newCriteria)
      };
    }),
  
  // Action to clear all filters
  clearFilters: () =>
    set((state) => ({
      searchTerm: '',
      filterCriteria: {
        preparationTime: '',
        difficulty: '',
        category: ''
      },
      filteredRecipes: state.recipes
    })),
  
  // Helper function to apply all filters
  applyFilters: (recipes, searchTerm = null, criteria = null) => {
    const state = get();
    const currentSearchTerm = searchTerm !== null ? searchTerm : state.searchTerm;
    const currentCriteria = criteria !== null ? criteria : state.filterCriteria;
    
    let filtered = [...recipes];
    
    // Apply search term filter
    if (currentSearchTerm.trim()) {
      const term = currentSearchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        (recipe.ingredients && recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(term)
        )) ||
        (recipe.tags && recipe.tags.some(tag => 
          tag.toLowerCase().includes(term)
        ))
      );
    }
    
    // Apply preparation time filter
    if (currentCriteria.preparationTime) {
      filtered = filtered.filter(recipe => {
        if (!recipe.preparationTime) return false;
        const time = parseInt(recipe.preparationTime);
        switch (currentCriteria.preparationTime) {
          case 'quick': return time <= 30;
          case 'medium': return time > 30 && time <= 60;
          case 'long': return time > 60;
          default: return true;
        }
      });
    }
    
    // Apply difficulty filter
    if (currentCriteria.difficulty) {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === currentCriteria.difficulty
      );
    }
    
    // Apply category filter
    if (currentCriteria.category) {
      filtered = filtered.filter(recipe => 
        recipe.category === currentCriteria.category
      );
    }
    
    return filtered;
  },
  
  // Action to get a recipe by ID
  getRecipeById: (id) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === parseInt(id));
  },
  
  // Action to set selected recipe
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  
  // Action to clear selected recipe
  clearSelectedRecipe: () => set({ selectedRecipe: null }),
  
  // Legacy search function for backward compatibility
  searchRecipes: (searchTerm) => {
    const state = get();
    return get().applyFilters(state.recipes, searchTerm, state.filterCriteria);
  }
}));

export default useRecipeStore;