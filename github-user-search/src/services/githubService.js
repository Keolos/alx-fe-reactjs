import axios from "axios";

// Function to search GitHub users with advanced filters
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = "";

    if (username) query += `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=10&page=${page}`
    );

    return response.data; // returns { total_count, items }
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
