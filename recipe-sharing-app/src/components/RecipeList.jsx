import useRecipeStore from './recipeStore';

const RecipeList = () => {
  // Get recipes from the Zustand store
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  // Handle recipe deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  // If no recipes, show a friendly message
  if (recipes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No Recipes Yet!</h3>
        <p style={{ color: '#868e96' }}>Start by adding your first recipe using the form above.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <h2 style={{
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '20px',
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px'
      }}>
        Recipe Collection ({recipes.length})
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {recipes.map(recipe => (
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
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
                {recipe.title}
              </h3>
              
              <p style={{
                color: '#6c757d',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                {recipe.description}
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f3f4',
              paddingTop: '15px'
            }}>
              <small style={{
                color: '#868e96',
                fontSize: '0.8rem'
              }}>
                Recipe ID: {recipe.id}
              </small>
              
              <button
                onClick={() => handleDelete(recipe.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;