import { useState } from 'react';
import useRecipeStore from '../components/recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterCriteria = useRecipeStore(state => state.filterCriteria);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const setFilterCriteria = useRecipeStore(state => state.setFilterCriteria);
  const clearFilters = useRecipeStore(state => state.clearFilters);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const recipes = useRecipeStore(state => state.recipes);
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Handle search input with debouncing
  const handleSearchChange = (value) => {
    setLocalSearchTerm(value);
    
    // Debounce search to avoid excessive filtering
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilterCriteria({ [filterType]: value });
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setLocalSearchTerm('');
    clearFilters();
    setShowAdvancedFilters(false);
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (filterCriteria.preparationTime) count++;
    if (filterCriteria.difficulty) count++;
    if (filterCriteria.category) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      margin: '20px 0 30px 0'
    }}>
      {/* Search Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '1.4rem',
          color: '#333',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🔍 Search Recipes
        </h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <span>
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </span>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Clear All ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Main Search Input */}
      <div style={{
        position: 'relative',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by recipe name, ingredients, or description..."
          style={{
            width: '100%',
            padding: '15px 50px 15px 45px',
            fontSize: '1.1rem',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8f9fa',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.backgroundColor = 'white';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            if (!e.target.value) {
              e.target.style.backgroundColor = '#f8f9fa';
            }
          }}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          🔍
        </div>

        {/* Clear Search Button */}
        {localSearchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              color: '#999',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '50%'
            }}
            onMouseEnter={(e) => e.target.style.color = '#666'}
            onMouseLeave={(e) => e.target.style.color = '#999'}
          >
            ✕
          </button>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: showAdvancedFilters ? '20px' : '0'
      }}>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          style={{
            backgroundColor: showAdvancedFilters ? '#007bff' : '#f8f9fa',
            color: showAdvancedFilters ? 'white' : '#666',
            border: '1px solid #e9ecef',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!showAdvancedFilters) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (!showAdvancedFilters) {
              e.target.style.backgroundColor = '#f8f9fa';
            }
          }}
        >
          ⚙️ Advanced Filters {showAdvancedFilters ? '▲' : '▼'}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {/* Preparation Time Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                ⏱️ Preparation Time
              </label>
              <select
                value={filterCriteria.preparationTime}
                onChange={(e) => handleFilterChange('preparationTime', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any time</option>
                <option value="quick">Quick (≤30 min)</option>
                <option value="medium">Medium (30-60 min)</option>
                <option value="long">Long (&gt;60 min)</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                📊 Difficulty Level
              </label>
              <select
                value={filterCriteria.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                🍽️ Category
              </label>
              <select
                value={filterCriteria.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any category</option>
                <option value="appetizer">Appetizer</option>
                <option value="main">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
                <option value="beverage">Beverage</option>
                <option value="salad">Salad</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #ddd'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '8px'
              }}>
                Active Filters:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {searchTerm.trim() && (
                  <span style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Search: "{searchTerm}"
                    <button
                      onClick={() => handleSearchChange('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0 2px'
                      }}
                    >×</button>
                  </span>
                )}
                
                {filterCriteria.preparationTime && (
                  <span style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Time: {filterCriteria.preparationTime}
                    <button
                      onClick={() => handleFilterChange('preparationTime', '')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0 2px'
                      }}
                    >×</button>
                  </span>
                )}
                
                {filterCriteria.difficulty && (
                  <span style={{
                    backgroundColor: '#ffc107',
                    color: 'black',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Difficulty: {filterCriteria.difficulty}
                    <button
                      onClick={() => handleFilterChange('difficulty', '')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'black',
                        cursor: 'pointer',
                        padding: '0 2px'
                      }}
                    >×</button>
                  </span>
                )}
                
                {filterCriteria.category && (
                  <span style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Category: {filterCriteria.category}
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0 2px'
                      }}
                    >×</button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;