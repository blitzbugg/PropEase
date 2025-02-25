import React, { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo and main nav */}
        <div className="flex items-center space-x-8">
          {/* Logo and brand name */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="PropEase Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-600">PropEase</span>
          </a>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            <a href="/agents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Agents</a>
          </div>
        </div>
        
        {/* Right section with auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/signin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Sign in</a>
          <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign up</a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4 pb-3">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            <a href="/agents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Agents</a>
            <div className="pt-4 flex flex-col space-y-3">
              <a href="/signin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Sign in</a>
              <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center">Sign up</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;