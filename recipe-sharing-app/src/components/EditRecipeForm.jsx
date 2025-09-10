import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = ({ recipeId, onCancel, isModal = false }) => {
  const navigate = useNavigate();
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const getRecipeById = useRecipeStore(state => state.getRecipeById);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  
  // Form validation and feedback
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load recipe data when component mounts
  useEffect(() => {
    const recipe = getRecipeById(recipeId);
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description
      });
    }
    setIsLoading(false);
  }, [recipeId, getRecipeById]);

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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Get the original recipe to preserve other properties
    const originalRecipe = getRecipeById(recipeId);
    
    const updatedRecipe = {
      ...originalRecipe,
      title: formData.title.trim(),
      description: formData.description.trim(),
      updatedAt: new Date().toLocaleDateString()
    };
    
    // Simulate API call delay
    setTimeout(() => {
      updateRecipe(updatedRecipe);
      setIsSubmitting(false);
      
      // Navigate back or close modal
      if (isModal && onCancel) {
        onCancel();
      } else {
        navigate(`/recipe/${recipeId}`);
      }
    }, 500);
  };

  // Handle cancel
  const handleCancel = () => {
    if (isModal && onCancel) {
      onCancel();
    } else {
      navigate(`/recipe/${recipeId}`);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666'
      }}>
        Loading recipe data...
      </div>
    );
  }

  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#dc3545'
      }}>
        Recipe not found!
      </div>
    );
  }

  const containerStyle = isModal ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  } : {};

  const formStyle = isModal ? {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
  } : {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    margin: '20px 0',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{
          fontSize: '1.8rem',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Edit Recipe: {recipe.title}
        </h2>
        
        <form onSubmit={handleSubmit}>
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
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter recipe title"
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
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your recipe..."
              rows="6"
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

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '500',
                backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#218838';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#28a745';
                }
              }}
            >
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeForm;