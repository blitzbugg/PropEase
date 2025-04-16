import React, { useState } from "react";
import Slider from "../components/Slider";
import { useLoaderData } from "react-router-dom";
import Map from "../components/Map";
import apiRequest from "../lib/apiRequest";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved || false);
  console.log(post);
  

  const handleSave = async () => {
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side (Existing Content) */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {/* Image Slider */}
          <div className="p-4">
            <Slider images={post.images} />
          </div>

          {/* Post Details */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-start flex-wrap border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-3xl font-bold mt-2 text-gray-800">{post.title}</h1>
                <p className="text-gray-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {post.address}, {post.city}
                </p>
              </div>
              <p className="text-2xl font-semibold text-blue-600 mt-2">
                ₹{post.price.toLocaleString()}
              </p>
            </div>

            {/* Property Type */}
            <div className="mt-4 flex gap-2">
              <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {post.type}
              </span>
              <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                {post.property}
              </span>
            </div>

            {/* Owner Profile */}
            <div className="flex items-center gap-3 mt-6 bg-gray-50 p-4 rounded-lg">
              <img
                src={post.user.avatar || "noavatar.png"}
                alt={post.user.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <span className="text-md font-semibold text-gray-800">
                  {post.user.username}
                </span>
                <p className="text-xs text-gray-500">Property Owner</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
              <div 
                className="text-gray-700 text-sm leading-relaxed border-l-4 border-blue-100 pl-4"
                dangerouslySetInnerHTML={{ __html: post.postDetail.desc }}
              />
            </div>
          </div>
        </div>

        {/* Right Side (Property Features) */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 text-gray-800">Property Features</h2>

          {/* General */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              General
            </h3>
            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
              <div className="mb-2 flex">
                <span className="font-medium text-gray-600 w-24">Utilities:</span>
                <span>{post.postDetail.utilities === "owner" 
                  ? "Owner pays for all utilities" 
                  : "Tenant pays for all utilities"}</span>
              </div>
              <div className="mb-2 flex">
                <span className="font-medium text-gray-600 w-24">Parking policy:</span>
                <>{post.postDetail.parking === "allowed"
                  ? "Parkings available"
                  : "No parking available"}</>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-600 w-24">Advance:</span>
                <span>{post.postDetail.advance === "Required" ? "Advance is Required" : "Advance is not necessary"}</span>
              </div>
            </div>
          </div>

          {/* Room Size */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Room Size
            </h3>
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center p-2">
                <p className="text-gray-500 text-xs mb-1">Bedrooms</p>
                <p className="text-xl font-semibold text-blue-600">{post.bedroom}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-gray-500 text-xs mb-1">Bathrooms</p>
                <p className="text-xl font-semibold text-blue-600">{post.bathroom}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-gray-500 text-xs mb-1">Size</p>
                <p className="text-xl font-semibold text-blue-600">{post.postDetail.size} <span className="text-xs">sqft</span></p>
              </div>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nearby Places
            </h3>
            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <span className="font-medium text-gray-600 w-24">Schools:</span>
                <span>{post.postDetail.school}</span>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-gray-600 w-24">Bus stops:</span>
                <span>{post.postDetail.bus}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="font-medium text-gray-600 w-24">Restaurants:</span>
                <span>{post.postDetail.restaurant}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Location
            </h3>
            <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
              <Map 
                items={[{
                  ...post,
                  latitude: parseFloat(post.latitude),
                  longitude: parseFloat(post.longitude)
                }]} 
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Send Message
            </button>
            <button 
              onClick={handleSave} 
              className={`flex-1 ${saved ? 'bg-yellow-100' : 'bg-gray-100'} text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-medium`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 mr-2 ${saved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {saved ? "Unsave" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;