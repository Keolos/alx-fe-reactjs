import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' // Tailwind CSS import
import UserProfile from './components/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 sm:p-6 md:p-8">

      {/* Logos */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-6 sm:mt-8 mb-6 sm:mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img className="w-20 h-20 sm:w-24 sm:h-24 animate-bounce" src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img className="w-20 h-20 sm:w-24 sm:h-24" src={reactLogo} alt="React logo" />
        </a>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 text-center mb-6 sm:mb-8">
        Vite + React + Tailwind
      </h1>

      {/* Counter and Profile Side-by-Side on lg screens */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-8 w-full max-w-5xl">

      {/* Counter Card */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md
                      hover:scale-105 transition-transform duration-300">
        <button
          onClick={() => setCount(count + 1)}
          className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-500 text-sm sm:text-base text-center">
          Edit <code className="bg-gray-100 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* User Profile Component */}
      <UserProfile />

      </div>

      {/* Footer Text */}
      <p className="text-gray-500 text-sm sm:text-base mt-6 md:mt-8 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
