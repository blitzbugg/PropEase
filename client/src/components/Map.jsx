import React from 'react';

const Map = ({ properties }) => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden relative shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-700 font-semibold mb-2">Property Locations</p>
            <div className="text-gray-600 text-sm">
              {properties.slice(0, 3).map((property) => (
                <span key={property.id} className="block">
                  • {property.title} ({property.latitude}, {property.longitude})
                </span>
              ))}
              {properties.length > 3 && (
                <span className="block mt-1 text-gray-500">
                  • ...and {properties.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Map;