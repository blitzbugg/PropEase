import React, { useState } from "react";
import Slider from "../components/Slider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved || false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log("Post data:", post);
  

  const handleSave = async () => {
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      setSaved((prev) => !prev);
    }
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    try {
      console.log("Current user ID:", currentUser.id);
      console.log("Post owner ID:", post.userId);

      if (!currentUser) {
        navigate("/login");
        return;
      }

      if (!post.userId) {
        console.error("No post owner ID found");
        return;
      }

      // Check if we're trying to message ourselves
      if (currentUser.id === post.userId) {
        console.error("Cannot message yourself");
        return;
      }

      // Make request to find-or-create endpoint
      const response = await apiRequest.post("/chats/find-or-create", {
        receiverId: post.userId
      });

      console.log("Chat response:", response.data);

      if (response.data && response.data.id) {
        navigate(`/profile/c/${response.data.id}`);
      } else {
        console.error("Invalid chat data received:", response);
      }

    } catch (error) {
      console.error("Error handling message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side (Main Content) */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          {/* Image Slider */}
          <div className="p-4 sm:p-5">
            <Slider images={post.images} />
          </div>

          {/* Post Details */}
          <div className="px-5 sm:px-7 pb-7">
            <div className="flex justify-between items-start flex-wrap border-b border-slate-100 pb-5 gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900 tracking-tight">{post.title}</h1>
                <p className="text-slate-500 mt-1.5 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {post.address}, {post.city}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Price</p>
                <p className="text-2xl font-extrabold text-emerald-600 mt-0.5">
                  ₹{post.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Property Type */}
            <div className="mt-4 flex gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                {post.type}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                {post.property}
              </span>
            </div>

            {/* Owner Profile */}
            <div className="flex items-center gap-3.5 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <img
                src={post.user.avatar || "noavatar.png"}
                alt={post.user.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <span className="text-md font-bold text-slate-900">
                  {post.user.username}
                </span>
                <p className="text-xs text-slate-500">Property Owner</p>
              </div>
              <span className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Verified
              </span>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="text-xl font-bold mb-3 text-slate-900">Description</h2>
              <div 
                className="text-slate-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.postDetail.desc }}
              />
            </div>
          </div>
        </div>

        {/* Right Side (Property Features) */}
        <div className="w-full lg:w-[340px] xl:w-[380px] bg-white rounded-2xl shadow-sm p-6 border border-slate-200 h-fit lg:sticky lg:top-24">
          <h2 className="text-lg font-bold mb-5 pb-3 border-b border-slate-100 text-slate-900">Property Features</h2>

          {/* General */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              General
            </h3>
            <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl space-y-2.5">
              <div className="flex">
                <span className="font-semibold text-slate-500 w-28">Utilities:</span>
                <span>{post.postDetail.utilities === "owner" 
                  ? "Owner pays for all utilities" 
                  : "Tenant pays for all utilities"}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-slate-500 w-28">Parking:</span>
                <>{post.postDetail.parking === "allowed"
                  ? "Parkings available"
                  : "No parking available"}</>
              </div>
              <div className="flex">
                <span className="font-semibold text-slate-500 w-28">Advance:</span>
                <span>{post.postDetail.advance === "Required" ? "Advance is Required" : "Advance is not necessary"}</span>
              </div>
            </div>
          </div>

          {/* Room Size */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Room Size
            </h3>
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl">
              <div className="text-center p-2 rounded-lg bg-white border border-slate-100">
                <p className="text-slate-500 text-xs mb-1">Bedrooms</p>
                <p className="text-xl font-extrabold text-slate-900">{post.bedroom}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-slate-100">
                <p className="text-slate-500 text-xs mb-1">Bathrooms</p>
                <p className="text-xl font-extrabold text-slate-900">{post.bathroom}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-slate-100">
                <p className="text-slate-500 text-xs mb-1">Size</p>
                <p className="text-xl font-extrabold text-slate-900">{post.postDetail.size} <span className="text-xs font-medium text-slate-400">sqft</span></p>
              </div>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nearby Places
            </h3>
            <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl space-y-2.5">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <span className="font-semibold text-slate-500 w-28">Schools:</span>
                <span>{post.postDetail.school}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-slate-500 w-28">Bus stops:</span>
                <span>{post.postDetail.bus}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="font-semibold text-slate-500 w-28">Restaurants:</span>
                <span>{post.postDetail.restaurant}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Location
            </h3>
            <div className="h-64 rounded-xl overflow-hidden border border-slate-200">
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
          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="flex-1 bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center font-semibold text-sm shadow-md shadow-emerald-600/30 disabled:bg-emerald-300 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
            <button 
              onClick={handleSave} 
              className={`flex-1 ${saved ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700'} border px-5 py-3 rounded-xl transition-all duration-200 flex items-center justify-center font-semibold text-sm active:scale-[0.98]`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 mr-2 ${saved ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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