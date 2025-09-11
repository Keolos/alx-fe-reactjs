import { Link } from 'react-router-dom';
import useRecipeStore from '../components/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  // Get filtered recipes instead of all recipes
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const allRecipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterCriteria = useRecipeStore(state => state.filterCriteria);

  // Check if any filters are active
  const hasActiveFilters = searchTerm.trim() || 
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
            borderRadius: '2px'
          }}
        >
          {part}
        </mark>
      ) : part
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
        icon: '⏱️'
      });
    }
    
    if (recipe.difficulty) {
      let difficultyColor = '#6c757d';
      switch (recipe.difficulty) {
        case 'easy': difficultyColor = '#28a745'; break;
        case 'medium': difficultyColor = '#ffc107'; break;
        case 'hard': difficultyColor = '#dc3545'; break;
      }
      
      badges.push({
        text: recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1),
        color: difficultyColor,
        icon: '📊'
      });
    }
    
    if (recipe.category) {
      badges.push({
        text: recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1),
        color: '#17a2b8',
        icon: '🍽️'
      });
    }
    
    return badges;
  };

  // If no recipes at all, show initial message
  if (allRecipes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍🍳</div>
        <h3 style={{ color: '#6c757d', marginBottom: '15px', fontSize: '1.5rem' }}>
          No Recipes Yet!
        </h3>
        <p style={{ color: '#868e96', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 25px' }}>
          Start building your recipe collection by adding your first delicious recipe using the form above.
        </p>
        <div style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          ↑ Add Your First Recipe
        </div>
      </div>
    );
  }

  // If no recipes match current filters
  if (filteredRecipes.length === 0 && hasActiveFilters) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'white',
        borderRadius: '15px',
        margin: '20px 0',
        border: '2px dashed #e9ecef'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
        <h3 style={{ color: '#6c757d', marginBottom: '15px', fontSize: '1.5rem' }}>
          No Recipes Found
        </h3>
        <p style={{ color: '#868e96', fontSize: '1.1rem', marginBottom: '20px' }}>
          We couldn't find any recipes matching your search criteria.
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px auto',
          maxWidth: '500px'
        }}>
          <h4 style={{ color: '#495057', marginBottom: '15px' }}>Try these suggestions:</h4>
          <ul style={{
            textAlign: 'left',
            color: '#6c757d',
            lineHeight: '1.6'
          }}>
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
            cursor: 'pointer'
          }}
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          color: '#333',
          marginBottom: '20px',
          borderBottom: '2px solid #007bff',
          paddingBottom: '10px'
        }}>
          Recipe Collection ({filteredRecipes.length})
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{
                fontSize: '1.3rem',
                color: '#007bff',
                marginBottom: '8px',
                lineHeight: '1.3'
              }}>
                {highlightSearchTerm(recipe.title, searchTerm)}
              </h3>

              <p style={{
                color: '#6c757d',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                {highlightSearchTerm(recipe.description, searchTerm)}
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '10px'
            }}>
              {getRecipeBadges(recipe).map((badge, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: badge.color,
                    color: 'white',
                    borderRadius: '5px',
                    padding: '3px 8px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  <span style={{ marginRight: '4px' }}>{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f3f4',
              paddingTop: '15px'
            }}>
              <Link
                to={`/recipes/${recipe.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.95rem'
                }}
              >
                View Details
              </Link>

              <DeleteRecipeButton recipeId={recipe.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;