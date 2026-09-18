import React from "react";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { useRouteLoaderData } from "react-router-dom";

const ListPage = () => {
  const posts = useRouteLoaderData("posts") || [];
  console.log("Posts in ListPage:", posts);
  
  // Ensure each item has required properties
  const validatedPosts = posts.map(post => ({
    id: post.id || Math.random().toString(36).substr(2, 9),
    img: post.img || '/default-property.jpg',
    title: post.title || 'Untitled Property',
    address: post.address || 'Address not available',
    price: post.price || 0,
    bedroom: post.bedroom || 0,
    bathroom: post.bathroom || 1,
    // Include any other properties your Card/Map needs
    ...post
  }));
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Filter />

        <div className="flex flex-col-reverse lg:flex-row mt-6 gap-6">
          {/* Property List */}
          <div className="lg:w-1/2 overflow-y-auto pr-1" style={{ maxHeight: "80vh" }}>
            {validatedPosts.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 font-semibold">
                  No properties found. Try tweaking your filters!
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Adjust the search criteria above to see more listings
                </p>
              </div>
            ) : (
              validatedPosts.map((item) => <Card key={item.id} property={item} />)
            )}
          </div>

          {/* Map Container */}
          <div className="lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 sticky top-20">
            <Map items={validatedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;