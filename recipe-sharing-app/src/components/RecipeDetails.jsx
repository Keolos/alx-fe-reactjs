import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton'; // ✅ Add this import (it was missing)

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();
  const getRecipeById = useRecipeStore(state => state.getRecipeById);
  
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  // Load recipe data when component mounts or ID changes
  useEffect(() => {
    const foundRecipe = getRecipeById(parseInt(id));
    setRecipe(foundRecipe);
    setIsLoading(false);
    
    // If recipe not found, redirect to home after a delay
    if (!foundRecipe) {
      setTimeout(() => navigate('/'), 2000);
    }
  }, [id, getRecipeById, navigate]);

  // Handle edit modal
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    // Refresh recipe data after edit
    const updatedRecipe = getRecipeById(parseInt(id));
    setRecipe(updatedRecipe);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⏳</div>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Loading Recipe...</h3>
          <p style={{ color: '#999' }}>Please wait while we fetch the recipe details.</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>😕</div>
          <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Recipe Not Found</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            The recipe you're looking for doesn't exist or may have been deleted.
          </p>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            ← Back to All Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        {/* Navigation */}
        <div style={{ marginBottom: '30px' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '8px 16px',
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#007bff';
            }}
          >
            ← Back to All Recipes
          </Link>
        </div>

        {/* Recipe Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Recipe Header */}
          <div style={{
            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
            color: 'white',
            padding: '40px 30px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '15px',
              lineHeight: '1.2'
            }}>
              {recipe.title}
            </h1>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              <span>📅 Created: {recipe.createdAt}</span>
              {recipe.updatedAt && <span>✏️ Updated: {recipe.updatedAt}</span>}
            </div>
          </div>

          {/* Recipe Content */}
          <div style={{ padding: '40px 30px' }}>
            {/* Description */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #007bff',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '1.4rem',
                color: '#333',
                marginBottom: '10px'
              }}>📝 Description</h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {recipe.description}
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Recipe ID</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{recipe.id}</div>
              </div>
              {recipe.preparationTime && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Prep Time</div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{recipe.preparationTime} min</div>
                </div>
              )}
              {recipe.difficulty && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Difficulty</div>
                  <div style={{
                    fontWeight: 'bold',
                    color: recipe.difficulty === 'easy'
                      ? '#28a745'
                      : recipe.difficulty === 'medium'
                        ? '#ffc107'
                        : '#dc3545',
                    textTransform: 'capitalize'
                  }}>
                    {recipe.difficulty}
                  </div>
                </div>
              )}
              {recipe.category && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Category</div>
                  <div style={{ fontWeight: 'bold', color: '#17a2b8' }}>
                    {recipe.category}
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {recipe.ingredients?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3>🥘 Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {recipe.tags?.length > 0 && (
              <div>
                <h3>🏷️ Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {recipe.tags.map((tag, i) => (
                    <span key={i} style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px'
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <FavoriteButton recipeId={recipe.id} size="large" variant="solid" />
            <button
              onClick={handleEditClick}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              ✏️ Edit Recipe
            </button>
            <DeleteRecipeButton recipeId={recipe.id} recipeName={recipe.title} size="large" />
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <EditRecipeForm 
            recipeId={parseInt(id)}
            onCancel={handleEditCancel}
            isModal={true}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
