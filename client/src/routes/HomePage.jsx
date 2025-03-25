import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);
  
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1200/600"
            alt="Hero Background"
            className="w-full h-full object-cover blur-sm brightness-75"
          />
        </div>
        <div className="relative py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Find Your Next Chapter
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover a curated selection of homes tailored to your unique lifestyle.
                Start your journey towards finding the perfect place to call home.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-gray-700 text-sm flex flex-col items-center animate-[bounce_2s_infinite]">
            <span className="mb-2 opacity-75">Explore More</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;