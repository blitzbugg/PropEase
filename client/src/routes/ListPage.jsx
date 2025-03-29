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
    <div className="container my-2 mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <Filter />

      <div className="flex flex-col-reverse lg:flex-row mt-6 gap-6">
        {/* Property List */}
        <div className="lg:w-1/2 overflow-y-auto" style={{ maxHeight: "80vh" }}>
          {validatedPosts.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <p className="text-gray-600 font-medium">
                No properties found. Try tweaking your filters!
              </p>
            </div>
          ) : (
            validatedPosts.map((item) => <Card key={item.id} property={item} />)
          )}
        </div>

        {/* Map Container */}
        <div className="lg:w-1/2 h-[500px] rounded-xl overflow-hidden shadow-md border border-gray-200">
          <Map items={validatedPosts} />
        </div>
      </div>
    </div>
  );
};

export default ListPage;