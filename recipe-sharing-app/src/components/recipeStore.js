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
  
  // Favorites and recommendations state
  favorites: [],
  recommendations: [],
  userPreferences: {
    favoriteCategories: {},
    favoriteDifficulties: {},
    favoritePreparationTimes: {},
    favoriteTags: {}
  },
  
  // Action to add a new recipe to the store
  addRecipe: (newRecipe) => 
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes),
        // Regenerate recommendations when new recipes are added
        recommendations: get().generateRecommendations(updatedRecipes, state.favorites, state.userPreferences)
      };
    }),
  
  // Action to set/replace all recipes (useful for initialization)
  setRecipes: (recipes) => 
    set((state) => ({
      recipes,
      filteredRecipes: get().applyFilters(recipes),
      recommendations: get().generateRecommendations(recipes, state.favorites, state.userPreferences)
    })),
  
  // Action to delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      const updatedFavorites = state.favorites.filter(favId => favId !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes),
        favorites: updatedFavorites,
        recommendations: get().generateRecommendations(updatedRecipes, updatedFavorites, state.userPreferences),
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
        recommendations: get().generateRecommendations(updatedRecipes, state.favorites, state.userPreferences),
        // Update selected recipe if it's the one being updated
        selectedRecipe: state.selectedRecipe?.id === updatedRecipe.id 
          ? updatedRecipe 
          : state.selectedRecipe
      };
    }),
  
  // Favorites management actions
  addFavorite: (recipeId) => 
    set((state) => {
      if (state.favorites.includes(recipeId)) return state; // Already favorited
      
      const newFavorites = [...state.favorites, recipeId];
      const recipe = state.recipes.find(r => r.id === recipeId);
      const updatedPreferences = get().updateUserPreferences(recipe, state.userPreferences);
      
      return {
        favorites: newFavorites,
        userPreferences: updatedPreferences,
        recommendations: get().generateRecommendations(state.recipes, newFavorites, updatedPreferences)
      };
    }),
  
  removeFavorite: (recipeId) => 
    set((state) => {
      const newFavorites = state.favorites.filter(id => id !== recipeId);
      const recipe = state.recipes.find(r => r.id === recipeId);
      const updatedPreferences = get().updateUserPreferences(recipe, state.userPreferences, true);
      
      return {
        favorites: newFavorites,
        userPreferences: updatedPreferences,
        recommendations: get().generateRecommendations(state.recipes, newFavorites, updatedPreferences)
      };
    }),
  
  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    const state = get();
    return state.favorites.includes(recipeId);
  },
  
  // Get favorite recipes
  getFavoriteRecipes: () => {
    const state = get();
    return state.favorites.map(id => state.recipes.find(recipe => recipe.id === id)).filter(Boolean);
  },
  
  // Update user preferences based on favorited recipes
  updateUserPreferences: (recipe, currentPreferences, isRemoving = false) => {
    const newPreferences = { ...currentPreferences };
    const increment = isRemoving ? -1 : 1;
    
    // Update category preferences
    if (recipe.category) {
      newPreferences.favoriteCategories = {
        ...newPreferences.favoriteCategories,
        [recipe.category]: (newPreferences.favoriteCategories[recipe.category] || 0) + increment
      };
    }
    
    // Update difficulty preferences
    if (recipe.difficulty) {
      newPreferences.favoriteDifficulties = {
        ...newPreferences.favoriteDifficulties,
        [recipe.difficulty]: (newPreferences.favoriteDifficulties[recipe.difficulty] || 0) + increment
      };
    }
    
    // Update preparation time preferences
    if (recipe.preparationTime) {
      const timeCategory = recipe.preparationTime <= 30 ? 'quick' : 
                          recipe.preparationTime <= 60 ? 'medium' : 'long';
      newPreferences.favoritePreparationTimes = {
        ...newPreferences.favoritePreparationTimes,
        [timeCategory]: (newPreferences.favoritePreparationTimes[timeCategory] || 0) + increment
      };
    }
    
    // Update tag preferences
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        newPreferences.favoriteTags = {
          ...newPreferences.favoriteTags,
          [tag.toLowerCase()]: (newPreferences.favoriteTags[tag.toLowerCase()] || 0) + increment
        };
      });
    }
    
    return newPreferences;
  },
  
  // Generate personalized recommendations
  generateRecommendations: (recipes = null, favorites = null, preferences = null) => {
    const state = get();
    const allRecipes = recipes || state.recipes;
    const userFavorites = favorites || state.favorites;
    const userPreferences = preferences || state.userPreferences;
    
    if (userFavorites.length === 0 || allRecipes.length === 0) {
      // Return popular recipes if no favorites
      return allRecipes.slice(0, 4);
    }
    
    const recommendations = allRecipes
      .filter(recipe => !userFavorites.includes(recipe.id)) // Exclude already favorited recipes
      .map(recipe => ({
        recipe,
        score: get().calculateRecommendationScore(recipe, userPreferences)
      }))
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 6) // Take top 6 recommendations
      .map(item => item.recipe);
    
    return recommendations;
  },
  
  // Calculate recommendation score for a recipe
  calculateRecommendationScore: (recipe, preferences) => {
    let score = 0;
    
    // Category preference score (weight: 3)
    if (recipe.category && preferences.favoriteCategories[recipe.category]) {
      score += preferences.favoriteCategories[recipe.category] * 3;
    }
    
    // Difficulty preference score (weight: 2)
    if (recipe.difficulty && preferences.favoriteDifficulties[recipe.difficulty]) {
      score += preferences.favoriteDifficulties[recipe.difficulty] * 2;
    }
    
    // Preparation time preference score (weight: 1.5)
    if (recipe.preparationTime) {
      const timeCategory = recipe.preparationTime <= 30 ? 'quick' : 
                          recipe.preparationTime <= 60 ? 'medium' : 'long';
      if (preferences.favoritePreparationTimes[timeCategory]) {
        score += preferences.favoritePreparationTimes[timeCategory] * 1.5;
      }
    }
    
    // Tag preference score (weight: 1)
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        const tagScore = preferences.favoriteTags[tag.toLowerCase()];
        if (tagScore) {
          score += tagScore * 1;
        }
      });
    }
    
    // Add small random factor to prevent same order every time
    score += Math.random() * 0.5;
    
    return score;
  },
  
  // Action to manually refresh recommendations
  refreshRecommendations: () => 
    set((state) => ({
      recommendations: get().generateRecommendations()
    })),
  
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
  setFilterCriteria; (criteria) =>
    set((state) => {
      const newCriteria = { ...state.filterCriteria, ...criteria };
      return {
        filterCriteria: newCriteria,
        filteredRecipes: get().applyFilters(state.recipes, state.searchTerm, newCriteria)
      };
    }),
  
  // Action to clear all filters
  clearFilters; () =>
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
  applyFilters; (recipes, searchTerm = null, criteria = null) => {
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
  getRecipeById; (id) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === parseInt(id));
  },
  
  // Action to set selected recipe
  setSelectedRecipe; (recipe) => set({ selectedRecipe: recipe }),
  
  // Action to clear selected recipe
  clearSelectedRecipe; () => set({ selectedRecipe: null }),
  
  // Legacy search function for backward compatibility
  searchRecipes; (searchTerm) => {
    const state = get();
    return get().applyFilters(state.recipes, searchTerm, state.filterCriteria);
  }
;

export default useRecipeStore;