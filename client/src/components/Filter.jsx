import React, { useState } from 'react';

const Filter = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Any');
  const [property, setProperty] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedroom, setBedroom] = useState('Any');

  const handleSearch = () => {
    onSearch({
      location,
      type,
      property,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      bedroom: bedroom === 'Any' ? undefined : bedroom,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200">
      <div className="flex-1">
        <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400"
          placeholder="Enter city location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="w-full md:w-40">
        <label htmlFor="type" className="block text-sm font-semibold text-gray-800 mb-2">
          Type
        </label>
        <select
          id="type"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
      </div>

      <div className="w-full md:w-40">
        <label htmlFor="property" className="block text-sm font-semibold text-gray-800 mb-2">
          Property
        </label>
        <select
          id="property"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div className="w-full md:w-32">
        <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-800 mb-2">
          Min Price
        </label>
        <input
          type="number"
          id="minPrice"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      <div className="w-full md:w-32">
        <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-800 mb-2">
          Max Price
        </label>
        <input
          type="number"
          id="maxPrice"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="w-full md:w-32">
        <label htmlFor="bedroom" className="block text-sm font-semibold text-gray-800 mb-2">
          Bedroom
        </label>
        <select
          id="bedroom"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4+">4+</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 flex items-center justify-center"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="ml-2">Search</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;