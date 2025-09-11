import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import RecipeDetails from './components/RecipeDetails';
import useRecipeStore from './components/recipeStore';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Initialize with enhanced sample recipes
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "Delicious homemade cookies with chocolate chips. Mix flour, butter, sugar, eggs, and chocolate chips. Bake at 375°F for 10-12 minutes until golden brown. Perfect for dessert or snacking!",
        preparationTime: 25,
        difficulty: 'easy',
        category: 'dessert',
        ingredients: ['2 cups all-purpose flour', '1 cup butter', '3/4 cup brown sugar', '2 eggs', '1 cup chocolate chips', '1 tsp vanilla extract'],
        tags: ['sweet', 'baking', 'comfort food', 'family-friendly'],
        createdAt: new Date().toLocaleDateString()
      },
      {
        id: 2,
        title: "Spaghetti Carbonara",
        description: "Traditional Italian pasta dish with eggs, cheese, and pancetta. Cook spaghetti al dente, mix with beaten eggs and cheese, add crispy pancetta. Serve immediately with black pepper and extra parmesan.",
        preparationTime: 20,
        difficulty: 'medium',
        category: 'main',
        ingredients: ['400g spaghetti', '4 egg yolks', '100g pancetta', '100g parmesan cheese', 'Black pepper', 'Salt'],
        tags: ['italian', 'pasta', 'quick', 'creamy'],
        createdAt: new Date().toLocaleDateString()
      },
      {
        id: 3,
        title: "Fresh Garden Salad",
        description: "A refreshing mix of seasonal vegetables with homemade vinaigrette. Combine mixed greens, cherry tomatoes, cucumbers, and red onions. Drizzle with olive oil and balsamic vinegar dressing.",
        preparationTime: 15,
        difficulty: 'easy',
        category: 'salad',
        ingredients: ['Mixed greens', '1 cup cherry tomatoes', '1 cucumber', '1/4 red onion', '3 tbsp olive oil', '2 tbsp balsamic vinegar'],
        tags: ['healthy', 'vegetarian', 'fresh', 'light'],
        createdAt: new Date().toLocaleDateString()
      },
      {
        id: 4,
        title: "Spicy Thai Curry",
        description: "Aromatic and flavorful Thai red curry with coconut milk, vegetables, and herbs. Simmer curry paste with coconut milk, add vegetables and protein of choice. Serve over jasmine rice with fresh herbs.",
        preparationTime: 45,
        difficulty: 'hard',
        category: 'main',
        ingredients: ['2 tbsp red curry paste', '400ml coconut milk', '200g vegetables', '2 tbsp fish sauce', '1 tbsp palm sugar', 'Thai basil', 'Jasmine rice'],
        tags: ['spicy', 'thai', 'coconut', 'exotic', 'flavorful'],
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
    <BrowserRouter>
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <Routes>
          {/* Main Recipe List Route */}
          <Route path="/" element={
            <>
              {/* Header */}
              <header style={{
                textAlign: 'center',
                padding: '40px 20px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h1 style={{
                  fontSize: '3.5rem',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px'
                }}>
                  🍳 Recipe Sharing App
                </h1>
                <p style={{
                  fontSize: '1.3rem',
                  maxWidth: '700px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  opacity: 0.95
                }}>
                  Discover, create, and share amazing recipes with our community. 
                  Search by ingredients, cooking time, or difficulty level!
                </p>
              </header>

              {/* Main Content */}
              <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '20px'
              }}>
                {/* Search Bar */}
                <SearchBar />

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
                marginTop: '80px',
                padding: '40px 20px',
                backgroundColor: '#2c3e50',
                color: 'white'
              }}>
                <div style={{
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    👨‍🍳 Happy Cooking! 👩‍🍳
                  </h3>
                  <p style={{
                    color: '#bdc3c7',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    lineHeight: '1.6'
                  }}>
                    Built with React ⚛️, Zustand 🐻, and lots of love for good food! 
                    Share your culinary creations and discover new favorites.
                  </p>
                  <p style={{
                    color: '#95a5a6',
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    © 2024 Recipe Sharing App | Enhanced with Advanced Search & Filtering
                  </p>
                </div>
              </footer>
            </>
          } />
          {/* Recipe Details Route */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;