import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
        Search results for{" "}
        <span className="text-emerald-600">
          {searchParams.get("city") || "all properties"}
        </span>
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Location
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City Location"
                onChange={handleChange}
                defaultValue={query.city}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          {/* Criteria row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Type</label>
              <select
                name="type"
                id="type"
                onChange={handleChange}
                defaultValue={query.type}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white"
              >
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="property" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Property</label>
              <select
                name="property"
                id="property"
                onChange={handleChange}
                defaultValue={query.property}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white"
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="minPrice" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Any"
                onChange={handleChange}
                defaultValue={query.minPrice}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="maxPrice" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Any"
                onChange={handleChange}
                defaultValue={query.maxPrice}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bedroom" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Bedroom</label>
              <select
                name="bedroom"
                id="bedroom"
                onChange={handleChange}
                defaultValue={query.bedroom}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 justify-end">
              <button
                onClick={handleFilter}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;