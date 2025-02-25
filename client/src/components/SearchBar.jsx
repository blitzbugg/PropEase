import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Buy/Rent Select */}
        <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow">
          <option>Buy</option>
          <option>Rent</option>
        </select>

        {/* Location Input */}
        <input
          type="text"
          placeholder="Enter Location"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />

        {/* Min Price Input */}
        <input
          type="number"
          placeholder="Min Price"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />

        {/* Max Price Input */}
        <input
          type="number"
          placeholder="Max Price"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />

        {/* Search Button */}
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg p-3 hover:from-indigo-700 hover:to-purple-700 transition-colors col-span-1 md:col-span-2 lg:col-span-1">
          Find Properties
        </button>
      </div>
    </div>
  );
};

export default SearchBar;