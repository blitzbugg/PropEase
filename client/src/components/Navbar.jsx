import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { useNotificationStore } from '../lib/notificationStore.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleIncomingMessage = (data) => {
      // If message is from another user, refresh unread notification count
      if (data && data.userId !== currentUser.id) {
        fetch();
      }
    };

    socket.on("getMessage", handleIncomingMessage);
    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, currentUser, fetch]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_10px_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm shadow-emerald-600/30">
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
            <Link to="/" className="ml-2.5 text-xl font-bold tracking-tight text-slate-900">
              Prop<span className="text-emerald-600">Ease</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link
                  to="/list"
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  Properties
                </Link>
                <Link
                  to="/add"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all duration-200 flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Property
                </Link>
                <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
                  <div className="relative">
                    <img
                      src={currentUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white border border-slate-200"
                    />
                    {number > 0 && (
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 shadow">
                        {number}
                      </span>
                    )}
                  </div>
                  <Link to="/profile" className="text-slate-800 text-sm font-semibold hover:text-emerald-600 transition-colors">
                    {currentUser.username}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/list" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                  Properties
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-slate-300 hover:border-emerald-600 hover:text-emerald-600 text-slate-700 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-emerald-600 block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Home
            </Link>
            <Link to="/list" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-emerald-600 block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Properties
            </Link>
            {currentUser && (
              <Link to="/add" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-emerald-600 block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-slate-50 transition-colors">
                Add Property
              </Link>
            )}
            <div className="pt-3 mt-2 border-t border-slate-100 space-y-2">
              {currentUser ? (
                <div className="flex flex-col items-start space-y-2 px-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={currentUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      {number > 0 && (
                        <span className="absolute top-0 right-0 bg-emerald-500 text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 shadow">
                          {number}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-800 text-sm font-semibold">{currentUser.username}</span>
                  </div>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors">
                    View Profile
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-colors">
                    Sign Up
                  </Link>
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