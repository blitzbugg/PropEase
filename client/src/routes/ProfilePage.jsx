import React, { useContext } from 'react';
import List from '../components/List';
import Chat from '../components/Chat';
import apiRequest from '../lib/apiRequest';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const data = useLoaderData();
  console.log("ProfilePage data:", data);
  
  const {updateUser, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      // Error handling preserved
    }
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User info header card - spans full width */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 w-full"></div>
          <div className="px-6 py-4 md:px-8 md:py-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex-shrink-0 ml-2">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={currentUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-grow pt-16 md:pt-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{currentUser.username}</h1>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0 md:self-center">
                <Link to="/profile/update">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Update Profile
                  </button>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="lg:w-1/2">
            {/* My List section with improved styling */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex justify-between items-center px-6 py-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">My List</h2>
                  </div>
                  
                  <Link to="/add">
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm text-sm font-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Post
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <List data={data.userPosts} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-1/2 space-y-8">
            {/* Chat component with improved container */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <Chat />
              </div>
            </div>

            {/* Saved List section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">Saved List</h2>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <List data={data.savedPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;