import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import apiRequest from "../lib/apiRequest.js";
import UploadWidget from "../components/UploadWidget.jsx";
import { useNavigate } from "react-router-dom";

function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return <div className="min-h-[200px] border rounded-md p-4 bg-gray-50">Loading editor...</div>;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 p-2 border rounded-t-md bg-gray-100">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          <span className="underline">U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-200"
        >
          Divider
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Redo
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="min-h-[200px] border border-t-0 p-4 rounded-b-md bg-white" 
      />
    </div>
  );
}

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
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
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-[3] overflow-y-auto">
        <div className="m-[30px_50px_100px_0]">
          <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
          <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-5">
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="title" className="font-medium">Title</label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                required
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
                className="p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="type" className="font-medium">Type</label>
              <select 
                name="type" 
                required
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
                className="p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="longitude" className="font-medium">Longitude</label>
              <input 
                id="longitude" 
                name="longitude" 
                type="text" 
                className="p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="utilities" className="font-medium">Utilities</label>
              <select 
                name="utilities" 
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="owner">Owner pays</option>
                <option value="tenant">Tenant pays</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="pet" className="font-medium">Pet Policy</label>
              <select 
                name="pet" 
                className="p-3 rounded-md border border-gray-300"
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="income" className="font-medium">Income Policy</label>
              <input 
                id="income" 
                name="income" 
                type="text" 
                className="p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="size" className="font-medium">Size (sqft)</label>
              <input 
                id="size" 
                name="size" 
                type="number" 
                min="0"
                className="p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="w-[30%] flex flex-col gap-2">
              <label htmlFor="school" className="font-medium">School Rating (1-10)</label>
              <input 
                id="school" 
                name="school" 
                type="number" 
                min="1"
                max="10"
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
                className="p-3 rounded-md border border-gray-300"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-[30%] rounded-md bg-teal-600 text-white font-bold p-4 cursor-pointer hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Add Post'}
            </button>
            {error && <div className="w-full text-red-500 p-3 rounded-md bg-red-50">{error}</div>}
          </form>
        </div>
      </div>
      <div className="flex-[2] bg-[#fcf5f3] flex flex-col gap-5 items-center justify-center p-5">
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
          uploadPreset: "propease", 
          multiple:false, 
          folder : "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;