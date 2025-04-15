import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotificationStore } from '../lib/notificationStore.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);

  React.useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  return (
    <nav className="relative bg-gradient-to-r from-indigo-100 to-purple-100 shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">
              PropEase
            </span>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Contact
            </Link>
            <Link to="/agents" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Agents
            </Link>
          </div>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              // User is logged in - show profile with notification badge
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={currentUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {number>0 && <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs transform translate-x-1/2 -translate-y-1/2">
                    {number}
                  </span>}
                </div>
                <span className="text-gray-800 text-sm font-medium">{currentUser.username}</span>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
                >
                  Profile
                </Link>
              </div>
            ) : (
              // User is not logged in - show auth buttons
              <>
                <a href='/login' className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 text-sm font-medium transition-colors duration-200">
                  Sign In
                </a>
                <a href='/register' className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 text-sm font-medium transition-colors duration-200">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-50 border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium"
            >
              Agents
            </a>
            <div className="pt-4 pb-3 space-y-2">
              {user ? (
                // User is logged in - show profile with notification badge in mobile view
                <div className="flex flex-col items-start space-y-2 px-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs transform translate-x-1/2 -translate-y-1/2">
                        {number}
                      </span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">John Doe</span>
                  </div>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              ) : (
                // User is not logged in - show auth buttons in mobile view
                <>
                  <button className="w-full text-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 text-sm font-medium transition-colors duration-200">
                    Sign In
                  </button>
                  <button className="w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 text-sm font-medium transition-colors duration-200">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;