import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const Dashboard = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recommendations = useRecipeStore(state => state.recommendations);
  const recipes = useRecipeStore(state => state.recipes);
  const userPreferences = useRecipeStore(state => state.userPreferences);

  // Calculate user statistics
  const totalRecipes = recipes.length;
  const favoritesCount = favorites.length;
  const recommendationsCount = recommendations.length;
  
  // Get most preferred category
  const topCategory = Object.entries(userPreferences.favoriteCategories)
    .sort(([,a], [,b]) => b - a)[0];
  
  // Get most preferred difficulty
  const topDifficulty = Object.entries(userPreferences.favoriteDifficulties)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h2 style={{
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        📊 Your Recipe Journey
      </h2>

      {/* Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Total Recipes */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid #e9ecef'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📚</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {totalRecipes}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            Total Recipes
          </div>
        </div>

        {/* Favorites */}
        <Link 
          to="/favorites"
          style={{
            backgroundColor: '#ffe6e6',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #ff6b6b',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>❤️</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff6b6b' }}>
            {favoritesCount}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#ff6b6b' }}>
            Favorite Recipes
          </div>
        </Link>

        {/* Recommendations */}
        <Link 
          to="/recommendations"
          style={{
            backgroundColor: '#e7f3ff',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #007bff',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✨</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
            {recommendationsCount}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#007bff' }}>
            Recommendations
          </div>
        </Link>
      </div>

      {/* Preferences Insights */}
      {favoritesCount > 0 && (
        <div style={{
          backgroundColor: '#f0f8ff',
          border: '1px solid #cce7ff',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: '#0066cc',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎯 Your Taste Profile
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {topCategory && (
              <div style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '5px' }}>🍽️</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                  {topCategory[0].charAt(0).toUpperCase() + topCategory[0].slice(1)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Favorite Category
                </div>
              </div>
            )}

            {topDifficulty && (
              <div style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '5px' }}>📊</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                  {topDifficulty[0].charAt(0).toUpperCase() + topDifficulty[0].slice(1)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Preferred Difficulty
                </div>
              </div>
            )}
          </div>

          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#0066cc',
            textAlign: 'center'
          }}>
            💡 <strong>Pro Tip:</strong> The more recipes you favorite, the better our recommendations become!
          </div>
        </div>
      )}

      {/* Getting Started Message for New Users */}
      {favoritesCount === 0 && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚀</div>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>
            Welcome to Your Recipe Journey!
          </h3>
          <p style={{ color: '#856404', marginBottom: '15px', lineHeight: '1.5' }}>
            Start by exploring recipes and clicking the heart icon to add them to your favorites. 
            The more you favorite, the better our personalized recommendations will become!
          </p>
          <div style={{ fontSize: '0.9rem', color: '#856404' }}>
            📌 Try favoriting 2-3 recipes to see magic happen!
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;