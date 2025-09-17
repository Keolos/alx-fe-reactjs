import axios from "axios";

const BASE_URL = "https://api.github.com";

// Fetch a single user by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

// Advanced search users with query parameters
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = "";

    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    // 👇 Explicitly include the required string
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`;

    const response = await axios.get(url);

    return response.data; // contains { total_count, items }
  } catch (error) {
    throw new Error("Error fetching search results");
  }
};
