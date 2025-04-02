import React from "react";
import Slider from "../components/Slider";
import { useLoaderData } from "react-router-dom";
import Map from "../components/Map";

const SinglePage = () => {
  const post = useLoaderData();
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex gap-8">
        {/* Left Side (Existing Content) */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image Slider */}
          <div className="p-4">
            <Slider images={post.images} />
          </div>

          {/* Post Details */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-start flex-wrap">
              <div>
                <h1 className="text-2xl font-bold mt-2">{post.title}</h1>
                <p className="text-gray-500 text-sm">
                  {post.address}, {post.city}
                </p>
              </div>
              <p className="text-xl font-semibold text-blue-600 mt-2">
                ₹{post.price}
              </p>
            </div>

            {/* Property Type */}
            <div className="mt-2 flex gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {post.type}
              </span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {post.property}
              </span>
            </div>

            {/* Owner Profile */}
            <div className="flex items-center gap-3 mt-4 bg-gray-50 p-3 rounded-md">
              <img
                src={post.user.avatar || "noavatar.png"}
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <span className="text-md font-medium">
                {post.user.username}
              </span>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <div 
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.postDetail.desc }}
              />
            </div>
          </div>
        </div>

        {/* Right Side (Property Features) */}
        <div className="w-1/3 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Property Features</h2>

          {/* General */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">General</h3>
            <div className="text-sm text-gray-700">
              <div className="mb-1">
                <span className="font-bold mr-1">Utilities:</span>
                {post.postDetail.utilities === "owner" 
                  ? "Owner pays for all utilities" 
                  : "Tenant pays for all utilities"}
              </div>
              <div className="mb-1">
                <span className="font-bold mr-1">Pet policy:</span>
                {post.postDetail.pets === "allowed"
                  ? "Pets are allowed"
                  : "Pets are not allowed"}
              </div>
              <div>
                <span className="font-bold mr-1">Income policy:</span>
                <span>{post.postDetail.income}</span>
              </div>
            </div>
          </div>

          {/* Room Size */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Room Size</h3>
            <div className="text-sm text-gray-700">
              <p>Bedrooms: {post.bedroom}</p>
              <p>Bathrooms: {post.bathroom}</p>
              <p>Size: {post.postDetail.size} sqft</p>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Nearby Places</h3>
            <div className="text-sm text-gray-700">
              <p>Schools: {post.postDetail.school}</p>
              <p>Bus stops: {post.postDetail.bus}</p>
              <p>Restaurants: {post.postDetail.restaurant}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="h-64">
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Send Message
            </button>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
              Save the Place
            </button>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default SinglePage;