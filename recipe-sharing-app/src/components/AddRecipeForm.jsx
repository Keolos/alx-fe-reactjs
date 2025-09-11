import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  // Get the addRecipe action from Zustand store
  const addRecipe = useRecipeStore(state => state.addRecipe);
  
  // Local state for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preparationTime: '',
    difficulty: '',
    category: '',
    ingredients: [''],
    tags: ['']
  });
  
  // State for form validation and feedback
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Recipe description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    // Validate preparation time if provided
    if (formData.preparationTime && (isNaN(formData.preparationTime) || formData.preparationTime <= 0)) {
      newErrors.preparationTime = 'Please enter a valid preparation time in minutes';
    }

    // Validate ingredients (at least one non-empty ingredient)
    const validIngredients = formData.ingredients.filter(ingredient => ingredient.trim());
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'Please add at least one ingredient';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new recipe object with enhanced data
    const newRecipe = {
      id: Date.now(), // Simple ID generation (in real app, use proper UUID)
      title: formData.title.trim(),
      description: formData.description.trim(),
      preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null,
      difficulty: formData.difficulty || null,
      category: formData.category || null,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim()).map(ingredient => ingredient.trim()),
      tags: formData.tags.filter(tag => tag.trim()).map(tag => tag.trim()),
      createdAt: new Date().toLocaleDateString()
    };
    
    // Add recipe to store
    addRecipe(newRecipe);
    
    // Clear form
    setFormData({
      title: '',
      description: '',
      preparationTime: '',
      difficulty: '',
      category: '',
      ingredients: [''],
      tags: ['']
    });
    setErrors({});
    
    // Show success feedback
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle array field changes (ingredients, tags)
  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Add new array item
  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  // Remove array item
  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        ✨ Add New Recipe
      </h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Basic Information Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '25px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📝 Basic Information
          </h3>

          {/* Title and Category Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Title Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Recipe Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter recipe title (e.g., Chocolate Chip Cookies)"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: errors.title ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
              />
              {errors.title && (
                <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.title}
                </small>
              )}
            </div>

            {/* Category Select */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select category</option>
                <option value="appetizer">🥗 Appetizer</option>
                <option value="main">🍽️ Main Course</option>
                <option value="dessert">🍰 Dessert</option>
                <option value="snack">🥨 Snack</option>
                <option value="beverage">🥤 Beverage</option>
                <option value="salad">🥙 Salad</option>
              </select>
            </div>
          </div>

          {/* Preparation Time and Difficulty Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Preparation Time */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                value={formData.preparationTime}
                onChange={(e) => handleInputChange('preparationTime', e.target.value)}
                placeholder="e.g., 30"
                min="1"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: errors.preparationTime ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
              />
              {errors.preparationTime && (
                <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.preparationTime}
                </small>
              )}
            </div>

            {/* Difficulty Select */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select difficulty</option>
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
              </select>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              Recipe Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your recipe, cooking instructions, and any special tips..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: errors.description ? '2px solid #dc3545' : '2px solid #e9ecef',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                resize: 'vertical',
                minHeight: '120px',
                boxSizing: 'border-box'
              }}
            />
            {errors.description && (
              <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                {errors.description}
              </small>
            )}
          </div>
        </div>

        {/* Ingredients Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '25px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🥘 Ingredients *
          </h3>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '12px',
              alignItems: 'flex-start'
            }}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayFieldChange('ingredients', index, e.target.value)}
                placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '0.95rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('ingredients', index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem('ingredients')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ➕ Add Ingredient
          </button>

          {errors.ingredients && (
            <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '8px', display: 'block' }}>
              {errors.ingredients}
            </small>
          )}
        </div>

        {/* Tags Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#333',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🏷️ Tags (Optional)
          </h3>
          
          <p style={{
            color: '#666',
            fontSize: '0.9rem',
            marginBottom: '15px',
            lineHeight: '1.5'
          }}>
            Add tags to help others find your recipe (e.g., vegetarian, spicy, quick, healthy)
          </p>

          {formData.tags.map((tag, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '12px',
              alignItems: 'flex-start'
            }}>
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                placeholder={`Tag ${index + 1} (e.g., vegetarian, spicy)`}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '0.95rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              
              {formData.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('tags', index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem('tags')}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ➕ Add Tag
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isSubmitting ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isSubmitting ? '⏳ Adding Recipe...' : '✨ Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;