import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import apiRequest from "../lib/apiRequest.js";
import UploadWidget from "../components/UploadWidget.jsx";

// Reuse the TiptapEditor component from NewPostPage
function TiptapEditor({ value, onChange }) {
  // ... (copy the TiptapEditor component from NewPostPage.jsx)
}

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest("/posts/" + id);
        setPost(res.data);
        setValue(res.data.postDetail.desc);
        setImages(res.data.images);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch post data");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      await apiRequest.put("/posts/" + id, {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          parking: inputs.parking,
          advance: inputs.advance,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + id);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(true);
    try {
      await apiRequest.delete("/posts/" + id);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete post");
      setIsDeleting(false);
    }
  };

  if (!post) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="flex h-full">
      <div className="flex-[3] overflow-y-auto">
        <div className="m-[30px_50px_100px_0]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-5">
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="title" className="font-medium">Title</label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                required
                defaultValue={post.title}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="price" className="font-medium">Price</label>
              <input 
                id="price" 
                name="price" 
                type="number" 
                required
                min="0"
                defaultValue={post.price}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="address" className="font-medium">Address</label>
              <input 
                id="address" 
                name="address" 
                type="text" 
                required
                defaultValue={post.address}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="desc" className="font-medium">Description</label>
              <TiptapEditor value={value} onChange={setValue} />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="city" className="font-medium">City</label>
              <input 
                id="city" 
                name="city" 
                type="text" 
                required
                defaultValue={post.city}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="bedroom" className="font-medium">Bedroom Number</label>
              <input 
                min={1} 
                id="bedroom" 
                name="bedroom" 
                type="number" 
                required
                defaultValue={post.bedroom}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="bathroom" className="font-medium">Bathroom Number</label>
              <input 
                min={1} 
                id="bathroom" 
                name="bathroom" 
                type="number" 
                required
                defaultValue={post.bathroom}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="type" className="font-medium">Type</label>
              <select 
                name="type" 
                required
                defaultValue={post.type}
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="property" className="font-medium">Property Type</label>
              <select 
                name="property" 
                required
                defaultValue={post.property}
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="latitude" className="font-medium">Latitude</label>
              <input 
                id="latitude" 
                name="latitude" 
                type="text" 
                required
                defaultValue={post.latitude}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="longitude" className="font-medium">Longitude</label>
              <input 
                id="longitude" 
                name="longitude" 
                type="text" 
                required
                defaultValue={post.longitude}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="utilities" className="font-medium">Utilities</label>
              <select 
                name="utilities" 
                defaultValue={post.postDetail.utilities}
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="owner">Owner pays</option>
                <option value="tenant">Tenant pays</option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="parking" className="font-medium">Parking Policy</label>
              <select 
                name="parking" 
                defaultValue={post.postDetail.parking}
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="advance" className="font-medium">Advance Policy</label>
              <select 
                name="advance" 
                defaultValue={post.postDetail.advance}
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="Required">Required</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="size" className="font-medium">Size (sqft)</label>
              <input 
                id="size" 
                name="size" 
                type="number" 
                min="0"
                defaultValue={post.postDetail.size}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="school" className="font-medium">Schools Nearby</label>
              <input 
                id="school" 
                name="school" 
                type="number" 
                min="1"
                max="10"
                defaultValue={post.postDetail.school}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="bus" className="font-medium">Bus Stops Nearby</label>
              <input 
                id="bus" 
                name="bus" 
                type="number" 
                min="0"
                defaultValue={post.postDetail.bus}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="restaurant" className="font-medium">Restaurants Nearby</label>
              <input 
                id="restaurant" 
                name="restaurant" 
                type="number" 
                min="0"
                defaultValue={post.postDetail.restaurant}
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-[30%] rounded-md bg-teal-600 text-white font-bold p-4 cursor-pointer hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
            {error && <div className="w-full text-red-500 p-3 rounded-md bg-red-50">{error}</div>}
          </form>
        </div>
      </div>
      <div className="flex-[2] bg-[#fcf5f3] flex flex-col gap-5 items-center justify-center p-5">
        {/* Image upload section */}
        {images.length > 0 ? (
          images.map((image, index) => (
            <img 
              src={image} 
              key={index} 
              alt="" 
              className="w-full max-w-md h-[180px] object-cover rounded-md shadow-sm"
            />
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">
            No images uploaded yet. Upload some images to showcase your property.
          </div>
        )}
        <UploadWidget
          uwConfig={{
            cloudName: "dslrhfcwf",
            uploadPreset: "propease", 
            multiple: true, 
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default EditPostPage; 