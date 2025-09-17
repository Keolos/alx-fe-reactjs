import axios from "axios";

const BASE_URL = "https://api.github.com";

// Fetch user data by username
export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

// Advanced search with location and minRepos (for Task 2)
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: { q: query.trim(), page, per_page: 10 },
  });

  return response.data;
};
