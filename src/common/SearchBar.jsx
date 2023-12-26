import React, { useState } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, loading }) => {
  const [buttonText, setButtonText] = useState('Search');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Change the button text to "Searching..."
    setButtonText('Searching...');

    // Perform the search
    handleSearch();

    // After the search is complete, change the button text back to "Search"
    setTimeout(() => {
      setButtonText('Search');
    }, 300); // Simulate delay for search operation
  };

  return (
    <form className="max-w-2xl my-10 mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Your Favorite Content..."
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-warning dark:focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-white search-btn absolute right-2.5 bottom-2.5 bg-primary hover:bg-warning focus:outline-none font-medium rounded-lg text-sm px-4 py-2 search-btn dark:focus:ring-primary"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
