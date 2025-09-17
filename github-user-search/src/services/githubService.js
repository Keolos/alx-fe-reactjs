const GITHUB_API_URL = 'https://api.github.com';

// Function to fetch user data from GitHub API
export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};