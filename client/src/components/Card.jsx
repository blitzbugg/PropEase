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
    <Link to={`/${id}`} className="block group">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] hover:-translate-y-1">
        {/* Image Section */}
        <div className="md:w-2/5 h-48 md:h-52 overflow-hidden relative bg-slate-100">
          <img
            src={Array.isArray(images) ? images[0] : images}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/default-property.jpg';
            }}
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm">
            Featured
          </span>
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-6 md:w-3/5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                {title}
              </h2>
              {isOwner && (
                <Link
                  to={`/edit/${id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                  title="Edit property"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-slate-400 hover:text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>
              )}
            </div>

            <p className="text-slate-500 text-sm mt-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {address}
            </p>

            <div className="mt-3.5 inline-flex items-baseline gap-1">
              <span className="text-sm font-bold text-emerald-700">₹</span>
              <span className="text-xl font-extrabold text-slate-900">{price.toLocaleString()}</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-slate-700 text-sm font-medium">{bedroom} bed{bedroom !== 1 && 's'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-700 text-sm font-medium">{bathroom} bath{bathroom !== 1 && 's'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;