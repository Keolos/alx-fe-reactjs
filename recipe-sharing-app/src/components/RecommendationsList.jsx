import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = ({ isCompact = false, maxDisplay = null }) => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const refreshRecommendations = useRecipeStore(state => state.refreshRecommendations);
  const userPreferences = useRecipeStore(state => state.userPreferences);
  
  // Apply display limit if specified
  const displayedRecommendations = maxDisplay 
    ? recommendations.slice(0, maxDisplay) 
    : recommendations;

  // Get user preference insights
  const getPreferenceInsights = () => {
    const insights = [];
    
    // Most preferred category
    const categories = Object.entries(userPreferences.favoriteCategories)
      .sort(([,a], [,b]) => b - a);
    if (categories.length > 0 && categories[0][1] > 0) {
      insights.push(`You love ${categories[0][0]} recipes`);
    }
    
    // Most preferred difficulty
    const difficulties = Object.entries(userPreferences.favoriteDifficulties)
      .sort(([,a], [,b]) => b - a);
    if (difficulties.length > 0 && difficulties[0][1] > 0) {
      insights.push(`${difficulties[0][0]} difficulty suits you`);
    }
    
    // Most preferred tags
    const tags = Object.entries(userPreferences.favoriteTags)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    if (tags.length > 0) {
      const tagNames = tags.map(([tag]) => tag).join(', ');
      insights.push(`You enjoy ${tagNames} recipes`);
    }
    
    return insights;
  };

  const preferenceInsights = getPreferenceInsights();

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

  // Get match reasons for a recipe
  const getMatchReasons = (recipe) => {
    const reasons = [];
    
    // Check category match
    if (recipe.category && userPreferences.favoriteCategories[recipe.category] > 0) {
      reasons.push(`You like ${recipe.category} recipes`);
    }
    
    // Check difficulty match
    if (recipe.difficulty && userPreferences.favoriteDifficulties[recipe.difficulty] > 0) {
      reasons.push(`${recipe.difficulty} difficulty matches your preference`);
    }
    
    // Check tag matches
    if (recipe.tags) {
      const matchingTags = recipe.tags.filter(tag => 
        userPreferences.favoriteTags[tag.toLowerCase()] > 0
      );
      if (matchingTags.length > 0) {
        reasons.push(`Contains ${matchingTags.slice(0, 2).join(', ')} elements you enjoy`);
      }
    }
    
    return reasons.slice(0, 2); // Limit to 2 reasons
  };

  // Empty state when no recommendations
  if (recommendations.length === 0) {
    const hasNoFavorites = favorites.length === 0;
    
    return (
      <div style={{
        textAlign: 'center',
        padding: isCompact ? '30px 20px' : '60px 20px',
        backgroundColor: 'white',
        borderRadius: isCompact ? '10px' : '15px',
        border: '2px dashed #e9ecef',
        margin: isCompact ? '15px 0' : '20px 0'
      }}>
        <div style={{ fontSize: isCompact ? '2.5rem' : '4rem', marginBottom: '15px' }}>
          {hasNoFavorites ? '🤖' : '🔄'}
        </div>
        <h3 style={{ 
          color: '#6c757d', 
          marginBottom: '10px',
          fontSize: isCompact ? '1.1rem' : '1.5rem'
        }}>
          {hasNoFavorites ? 'No Recommendations Yet' : 'Refreshing Recommendations'}
        </h3>
        <p style={{ 
          color: '#868e96',
          fontSize: isCompact ? '0.9rem' : '1rem',
          maxWidth: '400px',
          margin: '0 auto 20px',
          lineHeight: '1.5'
        }}>
          {hasNoFavorites 
            ? 'Add some recipes to your favorites to get personalized recommendations!'
            : 'We\'re finding new recipes based on your preferences...'
          }
        </p>
        
        {!hasNoFavorites && (
          <button
            onClick={refreshRecommendations}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh Recommendations
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ margin: isCompact ? '15px 0' : '20px 0' }}>
      {/* Header with Insights */}
      <div style={{
        marginBottom: isCompact ? '15px' : '25px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h2 style={{
            fontSize: isCompact ? '1.4rem' : '1.8rem',
            color: '#333',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ✨ Recommended for You
            <span style={{
              fontSize: isCompact ? '0.8rem' : '1rem',
              color: '#6c757d',
              fontWeight: 'normal'
            }}>
              ({recommendations.length} recipes)
            </span>
          </h2>
          
          <button
            onClick={refreshRecommendations}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Get new recommendations"
          >
            🔄 Refresh
          </button>
        </div>

        {/* User Preference Insights */}
        {preferenceInsights.length > 0 && !isCompact && (
          <div style={{
            backgroundColor: '#f0f8ff',
            border: '1px solid #cce7ff',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '0.9rem',
            color: '#0066cc'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>
              📊 Based on your preferences:
            </div>
            <div>
              {preferenceInsights.join(' • ')}
            </div>
          </div>
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact 
          ? 'repeat(auto-fill, minmax(300px, 1fr))' 
          : 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: isCompact ? '15px' : '20px'
      }}>
        {displayedRecommendations.map(recipe => {
          const badges = getRecipeBadges(recipe);
          const matchReasons = getMatchReasons(recipe);
          
          return (
            <div 
              key={recipe.id} 
              style={{
                backgroundColor: 'white',
                border: '2px solid #e7f3ff',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 123, 255, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.2)';
                e.currentTarget.style.borderColor = '#007bff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.1)';
                e.currentTarget.style.borderColor = '#e7f3ff';
              }}
            >
              {/* Recommendation Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '600',
                zIndex: 2
              }}>
                ✨ RECOMMENDED
              </div>

              {/* Favorite Button */}
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
                background: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)',
                padding: isCompact ? '15px' : '20px',
                color: 'white',
                paddingTop: '40px' // Space for badges
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
                {/* Match Reasons */}
                {matchReasons.length > 0 && (
                  <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '15px',
                    fontSize: '0.8rem',
                    color: '#856404'
                  }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      🎯 Why this matches you:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '15px' }}>
                      {matchReasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
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
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      Try This →
                    </Link>
                  </div>
                </div>

                {/* Tags Preview */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div style={{
                    marginTop: '15px',
                    paddingTop: '15px',
                    borderTop: '1px solid #f1f3f4'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px'
                    }}>
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#e7f3ff',
                            color: '#007bff',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button for Compact View */}
      {isCompact && recommendations.length > (maxDisplay || 3) && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={refreshRecommendations}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            🔄 Discover More Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;