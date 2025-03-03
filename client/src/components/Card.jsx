import React from 'react';

const Card = ({ property }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mb-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="md:w-2/5 h-48 overflow-hidden relative">
        <img
          src={property.img}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 md:w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
            {property.title}
          </h2>

          <div className="flex items-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Location"
              className="h-4 w-4 text-gray-500 mr-1"
            />
            <span className="text-gray-600 text-xs">{property.address}</span>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block px-3 py-1 rounded-full mb-2 text-white font-semibold shadow-sm">
            <span className="text-sm">$ {property.price}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <img
                src="./bed.png"
                alt="Bedrooms"
                className="h-4 w-4 text-gray-500 mr-1"
              />
              <span className="text-gray-700 text-xs">{property.bedroom} beds</span>
            </div>

            <div className="flex items-center">
              <img
                src="./bath.png"
                alt="Bathrooms"
                className="h-4 w-4 text-gray-500 mr-1"
              />
              <span className="text-gray-700 text-xs">
                {property.bathroom} bath{property.bathroom !== 1 && 's'}
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
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;