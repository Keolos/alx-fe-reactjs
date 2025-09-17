import  Axios  from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Function to fetch user data from GitHub API
export const fetchUserData = async (username) => {
  try {
    const response = await Axios.get(`${GITHUB_API_URL}/users/${username}`);

    if (response.status !== 200) {
      throw new Error('User not found');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
