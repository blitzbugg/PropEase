import React, { useContext } from 'react';
import { userData, listData } from '../lib/dummydata';
import List from '../components/List';
import Chat from '../components/Chat';
import apiRequest from '../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {

  const {updateUser,currentUser} = useContext(AuthContext);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      
    }
  }
  return (

    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row">
        {/* Left side - 50% width */}
        <div className="md:w-1/2 pr-0 md:pr-4">
          {/* User information section with update button */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">User Information</h1>
              <Link to="/profile/update">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                Update Profile
              </button>
              </Link>
              
            </div>

            {/* User details */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200">
                  <img
                    src={currentUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Username</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentUser.username}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentUser.email}</p>
                  <button onClick={handleLogout} className='w-25 bg-teal-600 border-none text-white px-1 py-1 mt-5 rounded'>Logout</button>
                </div>
              </div>
            </div>
          </div>

          {/* My List section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My List</h2>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md">
                Add New Post
              </button>
            </div>

            <List data={listData} />
          </div>
          
        </div>

        {/* Right side - 50% width (empty space for your other components) */}
        <div className="md:w-1/2 pl-0 md:pl-4 mt-8 md:mt-0">
          {/* Your other components will go here */}
          <Chat />
          <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Saved List</h2>
            </div>

            <List data={listData} />
          </div>
        </div>
      </div>
    </div>
  
);
};

export default ProfilePage;