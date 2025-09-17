import React, { useState } from 'react'
import { fetchUserData } from '../services/githubService'

const Search = () => {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => setUsername(e.target.value)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setUserData(null)

    try {
      const data = await fetchUserData(username)
      setUserData(data)
    } catch (err) {
      setError("Looks like we can't find the user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        GitHub User Search
      </h2>

      {/* Search Form */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* User Data Display */}
      {userData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="text-center">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {userData.name || userData.login}
            </h3>
            <p className="text-gray-600 mb-2">@{userData.login}</p>
            {userData.bio && (
              <p className="text-sm text-gray-700 mb-4">{userData.bio}</p>
            )}
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md 
                         hover:bg-gray-900 transition-colors"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
