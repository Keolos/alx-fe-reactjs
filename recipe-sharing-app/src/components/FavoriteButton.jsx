import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ 
  recipeId, 
  size = 'medium', 
  showText = true, 
  variant = 'default' 
}) => {
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId));
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle favorite toggle
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Button size configurations
  const sizeConfig = {
    small: {
      padding: '6px 12px',
      fontSize: '0.8rem',
      iconSize: '1rem'
    },
    medium: {
      padding: '8px 16px',
      fontSize: '0.9rem',
      iconSize: '1.2rem'
    },
    large: {
      padding: '12px 20px',
      fontSize: '1rem',
      iconSize: '1.4rem'
    }
  };

  // Button variant configurations
  const variantConfig = {
    default: {
      backgroundColor: isFavorite ? '#ff6b6b' : '#f8f9fa',
      color: isFavorite ? 'white' : '#666',
      border: `2px solid ${isFavorite ? '#ff6b6b' : '#e9ecef'}`,
      hoverBackgroundColor: isFavorite ? '#ff5252' : '#e9ecef',
      hoverColor: isFavorite ? 'white' : '#333'
    },
    minimal: {
      backgroundColor: 'transparent',
      color: isFavorite ? '#ff6b6b' : '#999',
      border: 'none',
      hoverBackgroundColor: 'rgba(255, 107, 107, 0.1)',
      hoverColor: '#ff6b6b'
    },
    solid: {
      backgroundColor: isFavorite ? '#ff6b6b' : '#6c757d',
      color: 'white',
      border: 'none',
      hoverBackgroundColor: isFavorite ? '#ff5252' : '#5a6268',
      hoverColor: 'white'
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return (
    <button
      onClick={handleToggleFavorite}
      style={{
        ...currentVariant,
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        borderRadius: '25px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        outline: 'none',
        transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isFavorite ? '0 2px 8px rgba(255, 107, 107, 0.3)' : 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = currentVariant.hoverBackgroundColor;
        e.target.style.color = currentVariant.hoverColor;
        if (!isFavorite) {
          e.target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = currentVariant.backgroundColor;
        e.target.style.color = currentVariant.color;
        if (!isAnimating) {
          e.target.style.transform = 'translateY(0)';
        }
      }}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span 
        style={{ 
          fontSize: currentSize.iconSize,
          display: 'flex',
          alignItems: 'center',
          transform: isAnimating && isFavorite ? 'rotate(360deg)' : 'none',
          transition: 'transform 0.6s ease'
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </span>
      
      {showText && (
        <span>
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;