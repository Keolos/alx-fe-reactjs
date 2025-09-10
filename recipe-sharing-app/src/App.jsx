import { useEffect } from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import useRecipeStore from './store/recipeStore';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Initialize with some sample recipes (optional)
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "Delicious homemade cookies with chocolate chips. Mix flour, butter, sugar, eggs, and chocolate chips. Bake at 375°F for 10-12 minutes until golden brown.",
        createdAt: new Date().toLocaleDateString()
      },
      {
        id: 2,
        title: "Spaghetti Carbonara",
        description: "Traditional Italian pasta dish with eggs, cheese, and pancetta. Cook spaghetti al dente, mix with beaten eggs and cheese, add crispy pancetta. Serve immediately.",
        createdAt: new Date().toLocaleDateString()
      }
    ];
    
    // Only set sample recipes if no recipes exist
    const currentRecipes = useRecipeStore.getState().recipes;
    if (currentRecipes.length === 0) {
      setRecipes(sampleRecipes);
    }
  }, [setRecipes]);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#007bff',
          marginBottom: '10px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          🍳 Recipe Sharing App
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6c757d',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Share your favorite recipes with the world! Add new recipes and browse through our collection of delicious dishes.
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Add Recipe Form */}
        <section style={{ marginBottom: '40px' }}>
          <AddRecipeForm />
        </section>

        {/* Recipe List */}
        <section>
          <RecipeList />
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '30px 20px',
        backgroundColor: 'white',
        borderTop: '1px solid #e9ecef'
      }}>
        <p style={{
          color: '#6c757d',
          fontSize: '0.9rem',
          margin: 0
        }}>
          Built with React ⚛️ and Zustand 🐻 | © 2024 Recipe Sharing App
        </p>
      </footer>
    </div>
  );
}

export default App;