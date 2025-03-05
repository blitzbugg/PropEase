import React from "react";
import Slider from "../components/Slider";
import { singlePostData } from "../lib/dummydata";
import Map from "../components/Map"; // Import the Map component

const SinglePage = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex gap-8">
        {/* Left Side (Existing Content) */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image Slider */}
          <div className="p-4">
            <Slider images={singlePostData.images} />
          </div>

          {/* Post Details */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-start flex-wrap">
              <div>
                <h1 className="text-2xl font-bold mt-2">{singlePostData.title}</h1>
                <p className="text-gray-500 text-sm">
                  {singlePostData.address}, {singlePostData.city}
                </p>
              </div>
              <p className="text-xl font-semibold text-blue-600 mt-2">
                ₹{singlePostData.price}
              </p>
            </div>

            {/* Owner Profile */}
            <div className="flex items-center gap-3 mt-4 bg-gray-50 p-3 rounded-md">
              <img
                src={singlePostData.owner.img}
                alt={singlePostData.owner.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <span className="text-md font-medium">
                {singlePostData.owner.name}
              </span>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {singlePostData.description}
              </p>
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
              <p>Utilities (Renter is responsible)</p>
              <p>Pet policy (Pets allowed)</p>
              <p>Advance (Must have 3x the rent)</p>
            </div>
          </div>

          {/* Room Size */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Room Size</h3>
            <div className="text-sm text-gray-700">
              <p>Room size: {singlePostData.roomSize} sqft</p>
              <p>Number of beds: {singlePostData.beds}</p>
              <p>Number of bathrooms: {singlePostData.bathrooms}</p>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Nearby Places</h3>
            <div className="text-sm text-gray-700">
              <p>School: {singlePostData.nearby.school}</p>
              <p>Bus stop: {singlePostData.nearby.busStop}</p>
              <p>Restaurant: {singlePostData.nearby.restaurant}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="h-64">
              <Map items={[singlePostData]} /> {/* Render the Map component */}
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
      </div>
    </div>
  );
};

export default SinglePage;