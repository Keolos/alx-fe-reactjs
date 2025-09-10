import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  // Get the addRecipe action from Zustand store
  const addRecipe = useRecipeStore(state => state.addRecipe);
  
  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // State for form validation and feedback
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Recipe description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
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
    
    // Create new recipe object
    const newRecipe = {
      id: Date.now(), // Simple ID generation (in real app, use proper UUID)
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toLocaleDateString()
    };
    
    // Add recipe to store
    addRecipe(newRecipe);
    
    // Clear form
    setTitle('');
    setDescription('');
    setErrors({});
    
    // Show success feedback
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h2 style={{
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Add New Recipe
      </h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Title Input */}
        <div style={{ marginBottom: '20px' }}>
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              // Clear error when user starts typing
              if (errors.title) {
                setErrors({ ...errors, title: '' });
              }
            }}
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
            onFocus={(e) => {
              if (!errors.title) {
                e.target.style.borderColor = '#007bff';
              }
            }}
            onBlur={(e) => {
              if (!errors.title) {
                e.target.style.borderColor = '#e9ecef';
              }
            }}
          />
          {errors.title && (
            <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
              {errors.title}
            </small>
          )}
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: '25px' }}>
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              // Clear error when user starts typing
              if (errors.description) {
                setErrors({ ...errors, description: '' });
              }
            }}
            placeholder="Describe your recipe, ingredients, and cooking instructions..."
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
              minHeight: '100px',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              if (!errors.description) {
                e.target.style.borderColor = '#007bff';
              }
            }}
            onBlur={(e) => {
              if (!errors.description) {
                e.target.style.borderColor = '#e9ecef';
              }
            }}
          />
          {errors.description && (
            <small style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
              {errors.description}
            </small>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            opacity: isSubmitting ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#007bff';
            }
          }}
        >
          {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;