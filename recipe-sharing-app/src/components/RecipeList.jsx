import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  // Get filtered recipes instead of all recipes
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const allRecipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterCriteria = useRecipeStore(state => state.filterCriteria);

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm.trim() ||
    filterCriteria.preparationTime ||
    filterCriteria.difficulty ||
    filterCriteria.category;

  // Helper function to highlight search terms
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '1px 2px',
            borderRadius: '2px',
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Helper function to get recipe badges
  const getRecipeBadges = (recipe) => {
    const badges = [];

    if (recipe.preparationTime) {
      const time = parseInt(recipe.preparationTime);
      let timeCategory = '';
      let badgeColor = '#6c757d';

      if (time <= 30) {
        timeCategory = 'Quick';
        badgeColor = '#28a745';
      } else if (time <= 60) {
        timeCategory = 'Medium';
        badgeColor = '#ffc107';
      } else {
        timeCategory = 'Long';
        badgeColor = '#dc3545';
      }

      badges.push({
        text: `${timeCategory} (${time}min)`,
        color: badgeColor,
        icon: '⏱️',
      });
    }

    if (recipe.difficulty) {
      let difficultyColor = '#6c757d';
      switch (recipe.difficulty) {
        case 'easy':
          difficultyColor = '#28a745';
          break;
        case 'medium':
          difficultyColor = '#ffc107';
          break;
        case 'hard':
          difficultyColor = '#dc3545';
          break;
      }

      badges.push({
        text:
          recipe.difficulty.charAt(0).toUpperCase() +
          recipe.difficulty.slice(1),
        color: difficultyColor,
        icon: '📊',
      });
    }

    if (recipe.category) {
      badges.push({
        text:
          recipe.category.charAt(0).toUpperCase() +
          recipe.category.slice(1),
        color: '#17a2b8',
        icon: '🍽️',
      });
    }

    return badges;
  };

  // If no recipes at all
  if (allRecipes.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          margin: '20px 0',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍🍳</div>
        <h3
          style={{
            color: '#6c757d',
            marginBottom: '15px',
            fontSize: '1.5rem',
          }}
        >
          No Recipes Yet!
        </h3>
        <p
          style={{
            color: '#868e96',
            fontSize: '1.1rem',
            maxWidth: '400px',
            margin: '0 auto 25px',
          }}
        >
          Start building your recipe collection by adding your first delicious
          recipe using the form above.
        </p>
        <div
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          ↑ Add Your First Recipe
        </div>
      </div>
    );
  }

  // If no recipes match current filters
  if (filteredRecipes.length === 0 && hasActiveFilters) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '15px',
          margin: '20px 0',
          border: '2px dashed #e9ecef',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
        <h3
          style={{
            color: '#6c757d',
            marginBottom: '15px',
            fontSize: '1.5rem',
          }}
        >
          No Recipes Found
        </h3>
        <p
          style={{
            color: '#868e96',
            fontSize: '1.1rem',
            marginBottom: '20px',
          }}
        >
          We couldn't find any recipes matching your search criteria.
        </p>

        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px auto',
            maxWidth: '500px',
          }}
        >
          <h4 style={{ color: '#495057', marginBottom: '15px' }}>
            Try these suggestions:
          </h4>
          <ul
            style={{
              textAlign: 'left',
              color: '#6c757d',
              lineHeight: '1.6',
            }}
          >
            <li>Check your spelling and try different keywords</li>
            <li>Remove some filters to see more results</li>
            <li>Try searching for ingredients instead of dish names</li>
            <li>Browse all recipes by clearing your search</li>
          </ul>
        </div>

        <button
          onClick={() => useRecipeStore.getState().clearFilters()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
        }}
      >
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#333',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          📚 Recipe Collection
          <span
            style={{
              fontSize: '1rem',
              color: '#6c757d',
              fontWeight: 'normal',
            }}
          >
            ({filteredRecipes.length}{' '}
            {filteredRecipes.length === 1 ? 'recipe' : 'recipes'})
          </span>
        </h2>

        {hasActiveFilters && (
          <div
            style={{
              backgroundColor: '#e7f3ff',
              color: '#0066cc',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🎯 Filtered results
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px',
        }}
      >
        {filteredRecipes.map((recipe) => {
          const badges = getRecipeBadges(recipe);

          return (
            <div
              key={recipe.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 2px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* Recipe Header */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '20px',
                  color: 'white',
                  position: 'relative',
                }}
              >
                {/* Favorite Button */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: 2,
                  }}
                >
                  <FavoriteButton
                    recipeId={recipe.id}
                    size="small"
                    showText={false}
                    variant="minimal"
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    paddingRight: '45px',
                  }}
                >
                  <Link
                    to={`/recipe/${recipe.id}`}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      lineHeight: '1.3',
                      flex: 1,
                    }}
                  >
                    {highlightSearchTerm(recipe.title, searchTerm)}
                  </Link>

                  <DeleteRecipeButton
                    recipeId={recipe.id}
                    recipeName={recipe.title}
                    showText={false}
                    size="small"
                  />
                </div>

                {/* Recipe Badges */}
                {badges.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                    }}
                  >
                    {badges.map((badge, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span>{badge.icon}</span>
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Recipe Content */}
              <div style={{ padding: '20px' }}>
                <p
                  style={{
                    color: '#555',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    margin: '0 0 15px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {highlightSearchTerm(recipe.description, searchTerm)}
                </p>

                {/* Recipe Meta Information */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid #f1f3f4',
                    fontSize: '0.8rem',
                    color: '#868e96',
                  }}
                >
                  <div>
                    <div>📅 Created: {recipe.createdAt}</div>
                    {recipe.updatedAt && (
                      <div>✏️ Updated: {recipe.updatedAt}</div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <Link
                      to={`/recipe/${recipe.id}`}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = '#0056b3')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = '#007bff')
                      }
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Ingredients Preview */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '12px 20px',
                    borderTop: '1px solid #e9ecef',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#666',
                      marginBottom: '6px',
                    }}
                  >
                    🥘 Key Ingredients:
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: '#333',
                    }}
                  >
                    {recipe.ingredients
                      .slice(0, 3)
                      .map((ingredient, index) =>
                        highlightSearchTerm(ingredient, searchTerm)
                      )
                      .reduce(
                        (prev, curr) =>
                          prev === null ? [curr] : [...prev, ', ', curr],
                        null
                      )}
                    {recipe.ingredients.length > 3 && (
                      <span style={{ color: '#666' }}>
                        ... and {recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results Summary */}
      {filteredRecipes.length > 0 && hasActiveFilters && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
          }}
        >
          <p
            style={{
              color: '#666',
              margin: 0,
              fontSize: '0.9rem',
            }}
          >
            Showing {filteredRecipes.length} of {allRecipes.length} total recipes
            {hasActiveFilters && (
              <span>
                {' • '}
                <button
                  onClick={() => useRecipeStore.getState().clearFilters()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  View all recipes
                </button>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
