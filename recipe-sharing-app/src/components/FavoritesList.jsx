import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const FavoritesList = ({ isCompact = false, maxDisplay = null }) => {
  const getFavoriteRecipes = useRecipeStore(state => state.getFavoriteRecipes);
  const favorites = getFavoriteRecipes();
  
  // Apply display limit if specified
  const displayedFavorites = maxDisplay ? favorites.slice(0, maxDisplay) : favorites;
  
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
        text: `${time}min`,
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
    
    return badges;
  };

  // Empty state when no favorites
  if (favorites.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: isCompact ? '30px 20px' : '60px 20px',
        backgroundColor: 'white',
        borderRadius: isCompact ? '10px' : '15px',
        border: '2px dashed #e9ecef',
        margin: isCompact ? '15px 0' : '20px 0'
      }}>
        <div style={{ fontSize: isCompact ? '2.5rem' : '4rem', marginBottom: '15px' }}>💔</div>
        <h3 style={{ 
          color: '#6c757d', 
          marginBottom: '10px',
          fontSize: isCompact ? '1.1rem' : '1.5rem'
        }}>
          No Favorite Recipes Yet
        </h3>
        <p style={{ 
          color: '#868e96',
          fontSize: isCompact ? '0.9rem' : '1rem',
          maxWidth: '400px',
          margin: '0 auto 15px'
        }}>
          Start exploring recipes and click the heart icon to save your favorites!
        </p>
        
        {!isCompact && (
          <div style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginTop: '10px'
          }}>
            🔍 Browse Recipes
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ margin: isCompact ? '15px 0' : '20px 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isCompact ? '15px' : '25px'
      }}>
        <h2 style={{
          fontSize: isCompact ? '1.4rem' : '1.8rem',
          color: '#333',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ❤️ My Favorites
          <span style={{
            fontSize: isCompact ? '0.8rem' : '1rem',
            color: '#6c757d',
            fontWeight: 'normal'
          }}>
            ({favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'})
          </span>
        </h2>
        
        {isCompact && favorites.length > (maxDisplay || 3) && (
          <Link 
            to="/favorites"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              padding: '5px 10px',
              borderRadius: '15px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef'
            }}
          >
            View All →
          </Link>
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact 
          ? 'repeat(auto-fill, minmax(280px, 1fr))' 
          : 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: isCompact ? '15px' : '25px'
      }}>
        {displayedFavorites.map(recipe => {
          const badges = getRecipeBadges(recipe);
          
          return (
            <div 
              key={recipe.id} 
              style={{
                backgroundColor: 'white',
                border: '2px solid #ff6b6b',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.15)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.15)';
              }}
            >
              {/* Favorite Indicator */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 2
              }}>
                <FavoriteButton 
                  recipeId={recipe.id}
                  size="small"
                  showText={false}
                  variant="minimal"
                />
              </div>

              {/* Recipe Header */}
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                padding: isCompact ? '15px' : '20px',
                color: 'white',
                paddingRight: '50px' // Space for favorite button
              }}>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: isCompact ? '1.1rem' : '1.3rem',
                    fontWeight: 'bold',
                    lineHeight: '1.3',
                    display: 'block',
                    marginBottom: badges.length > 0 ? '12px' : '0'
                  }}
                >
                  {recipe.title}
                </Link>
                
                {/* Recipe Badges */}
                {badges.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {badges.map((badge, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.25)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
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
              <div style={{ padding: isCompact ? '15px' : '20px' }}>
                <p style={{
                  color: '#555',
                  lineHeight: '1.6',
                  fontSize: isCompact ? '0.9rem' : '0.95rem',
                  margin: '0 0 15px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: isCompact ? 2 : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {recipe.description}
                </p>

                {/* Recipe Meta Information */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid #f1f3f4',
                  fontSize: '0.8rem',
                  color: '#868e96'
                }}>
                  <div>
                    <div>📅 {recipe.createdAt}</div>
                    {recipe.updatedAt && (
                      <div>✏️ Updated: {recipe.updatedAt}</div>)
                    }
                  </div>                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesList;
