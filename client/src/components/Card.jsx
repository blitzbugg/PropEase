import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Card = ({ property = {} }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    id = '',
    images = '/default-property.jpg',
    title = 'Untitled Property',
    address = 'Address not available',
    price = 0,
    bedroom = 0,
    bathroom = 1,
    userId = '',
  } = property;

  const isOwner = currentUser?.id === userId;

  return (
    <Link to={`/${id}`} className="block">
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

            <p className="text-gray-600 text-xs mb-2">{address}</p>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block px-3 py-1 rounded-full mb-2 text-white font-semibold shadow-sm">
              <span className="text-sm">$ {price.toLocaleString()}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <img
                  src="/bed.png"
                  alt="Bedrooms"
                  className="h-4 w-4 text-gray-500 mr-1"
                />
                <span className="text-gray-700 text-xs">
                  {bedroom} bed{bedroom !== 1 && 's'}
                </span>
              </div>

              <div className="flex items-center">
                <img
                  src="/bath.png"
                  alt="Bathrooms"
                  className="h-4 w-4 text-gray-500 mr-1"
                />
                <span className="text-gray-700 text-xs">
                  {bathroom} bath{bathroom !== 1 && 's'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-1 mt-2">
            {isOwner && (
              <Link
                to={`/edit/${id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;