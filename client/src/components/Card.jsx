import React from 'react';

const Card = ({ property = {} }) => {
  // Set default values for all required properties
  const {
    images = '/default-property.jpg',
    title = 'Untitled Property',
    address = 'Address not available',
    price = 0,
    bedroom = 0,
    bathroom = 1
  } = property;

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mb-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section with fallback */}
      <div className="md:w-2/5 h-48 overflow-hidden relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = '/default-property.jpg';
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 md:w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
            {title}
          </h2>

          <div className="flex items-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Location"
              className="h-4 w-4 text-gray-500 mr-1"
            />
            <span className="text-gray-600 text-xs">{address}</span>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block px-3 py-1 rounded-full mb-2 text-white font-semibold shadow-sm">
            <span className="text-sm">$ {price.toLocaleString()}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <img
                src="./bed.png"
                alt="Bedrooms"
                className="h-4 w-4 text-gray-500 mr-1"
                onError={(e) => {
                  e.target.src = 'https://cdn-icons-png.flaticon.com/512/659/659841.png';
                }}
              />
              <span className="text-gray-700 text-xs">
                {bedroom} bed{bedroom !== 1 && 's'}
              </span>
            </div>

            <div className="flex items-center">
              <img
                src="./bath.png"
                alt="Bathrooms"
                className="h-4 w-4 text-gray-500 mr-1"
                onError={(e) => {
                  e.target.src = 'https://cdn-icons-png.flaticon.com/512/659/659841.png';
                }}
              />
              <span className="text-gray-700 text-xs">
                {bathroom} bath{bathroom !== 1 && 's'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-1 mt-2">
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Save property"
          >
            <img
              src="./save.png"
              alt="Save"
              className="h-5 w-5 text-gray-500 hover:text-indigo-500 transition-colors duration-200"
              onError={(e) => {
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/5662/5662990.png';
              }}
            />
          </button>

          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Message about property"
          >
            <img
              src="./chat.png"
              alt="Message"
              className="h-5 w-5 text-gray-500 hover:text-indigo-500 transition-colors duration-200"
              onError={(e) => {
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/666/666162.png';
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;