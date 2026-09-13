import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-white/60 overflow-hidden">
      {/* Segmented Buy / Rent control */}
      <div className="flex gap-1.5 p-2.5 bg-slate-50/80 border-b border-slate-100">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`flex-1 py-2.5 px-4 text-sm font-semibold uppercase tracking-wide rounded-xl transition-all duration-200
              ${
                query.type === type
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search fields */}
      <div className="p-3 sm:p-4">
        <form className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <label className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                name="city"
                placeholder="City, locality..."
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              />
            </label>

            <div className="hidden sm:block h-8 w-px bg-slate-200 mx-1 flex-shrink-0" />

            <div className="flex items-center gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min price"
                onChange={handleChange}
                className="w-full sm:w-28 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
              />
              <span className="text-slate-400 text-sm flex-shrink-0">—</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max price"
                onChange={handleChange}
                className="w-full sm:w-28 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
              />
            </div>
          </div>

          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
            className="flex-shrink-0"
          >
            <button
              type="button"
              className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-3 px-8 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;