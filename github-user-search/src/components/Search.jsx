import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // --- Advanced Search ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username && !location && !minRepos) return;

    setLoading(true);
    setError(null);
    setUsers([]);
    setPage(1);

    try {
      const results = await searchUsers({
        username,
        location,
        minRepos,
        page: 1,
      });

      setUsers(results.items);
      setTotalCount(results.total_count);
      setHasMore(results.total_count > results.items.length);
    } catch {
      setError("Looks like we can’t find any matching users");
    } finally {
      setLoading(false);
    }
  };

  // --- Quick Fetch by Username ---
  const handleSingleUserFetch = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const user = await fetchUserData(username);
      setUsers([user]); // wrap in array so UI still works
      setHasMore(false);
    } catch {
      setError("Looks like we can’t find the user");
    } finally {
      setLoading(false);
    }
  };

  // --- Infinite Scroll ---
  const fetchMoreUsers = async () => {
    try {
      const nextPage = page + 1;
      const results = await searchUsers({
        username,
        location,
        minRepos,
        page: nextPage,
      });

      setUsers((prev) => [...prev, ...results.items]);
      setPage(nextPage);
      setHasMore(users.length + results.items.length < totalCount);
    } catch {
      setError("Could not load more users");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        GitHub Advanced User Search
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Min repos"
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-1 md:col-span-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Advanced Search"}
        </button>
      </form>

      {/* Quick Fetch Button */}
      <button
        type="button"
        onClick={handleSingleUserFetch}
        disabled={loading || !username}
        className="w-full mb-6 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? "Fetching..." : "Quick Fetch by Username"}
      </button>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Results */}
      {users.length > 0 && (
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreUsers}
          hasMore={hasMore}
          loader={<p className="text-center text-gray-600">Loading more...</p>}
          endMessage={
            <p className="text-center text-gray-500 mt-4">
              You have seen all results 🎉
            </p>
          }
        >
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id || user.login}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user.login}
                  </h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Search;
