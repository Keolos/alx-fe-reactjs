import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, recipeName, showText = true, size = 'medium' }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle delete confirmation
  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call delay (optional)
    setTimeout(() => {
      deleteRecipe(recipeId);
      setIsDeleting(false);
      setShowConfirmation(false);
      
      // Navigate back to home page after deletion
      navigate('/');
    }, 500);
  };

  // Button styles based on size
  const getButtonStyles = () => {
    const baseStyles = {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: isDeleting ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: isDeleting ? 0.7 : 1
    };

    const sizeStyles = {
      small: { padding: '6px 12px', fontSize: '0.8rem' },
      medium: { padding: '8px 16px', fontSize: '0.9rem' },
      large: { padding: '12px 20px', fontSize: '1rem' }
    };

    return { ...baseStyles, ...sizeStyles[size] };
  };

  if (showConfirmation) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            color: '#333',
            marginBottom: '15px'
          }}>
            Delete Recipe
          </h3>
          
          <p style={{
            color: '#666',
            marginBottom: '25px',
            lineHeight: '1.5'
          }}>
            Are you sure you want to delete <strong>"{recipeName}"</strong>? 
            This action cannot be undone.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setShowConfirmation(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
              Cancel
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                opacity: isDeleting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = '#c82333';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = '#dc3545';
                }
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete Recipe'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirmation(true)}
      disabled={isDeleting}
      style={getButtonStyles()}
      onMouseEnter={(e) => {
        if (!isDeleting) {
          e.target.style.backgroundColor = '#c82333';
          e.target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDeleting) {
          e.target.style.backgroundColor = '#dc3545';
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      🗑️ {showText && (isDeleting ? 'Deleting...' : 'Delete')}
    </button>
  );
};

export default DeleteRecipeButton;