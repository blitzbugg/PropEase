import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"]; // Removed "Sold" as requested

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  // Original functions unchanged
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Simplified tabs */}
      <div className="flex">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors
              ${
                query.type === type
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Compact search form */}
      <div className="p-4">
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min price"
            onChange={handleChange}
            className="w-full sm:w-24 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            onChange={handleChange}
            className="w-full sm:w-24 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
            className="flex-shrink-0"
          >
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Search
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;