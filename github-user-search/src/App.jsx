import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-red-500">
            GitHub User Search Application
          </h1>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default App;