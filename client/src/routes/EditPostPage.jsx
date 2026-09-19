import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import apiRequest from "../lib/apiRequest.js";
import UploadWidget from "../components/UploadWidget.jsx";

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
    return <div className="min-h-[200px] border border-slate-200 rounded-xl p-4 bg-slate-50 text-slate-500">Loading editor...</div>;
  }

  const toolbarBtn = (active) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border ${
      active
        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
        : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
    }`;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 rounded-t-xl bg-slate-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toolbarBtn(editor.isActive('bold'))}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toolbarBtn(editor.isActive('italic'))}
        >
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={toolbarBtn(editor.isActive('underline'))}
        >
          <span className="underline">U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={toolbarBtn(editor.isActive('heading', { level: 1 }))}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toolbarBtn(editor.isActive('heading', { level: 2 }))}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarBtn(editor.isActive('bulletList'))}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarBtn(editor.isActive('orderedList'))}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={toolbarBtn(editor.isActive('blockquote'))}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
        >
          Divider
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
        >
          Redo
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[200px] border border-t-0 border-slate-200 p-4 rounded-b-xl bg-white focus-within:ring-2 focus-within:ring-emerald-500/10 [&_.tiptap]:outline-none [&_.tiptap]:min-h-[180px]"
      />
    </div>
  );
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

  if (!post) return <div className="p-8 text-center text-slate-500">Loading...</div>;

  const inputCls = "px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800";
  const labelCls = "text-sm font-semibold text-slate-700";

  return (
    <div className="flex h-full bg-slate-50">
      <div className="flex-[3] overflow-y-auto">
        <div className="mx-auto max-w-4xl py-8 px-4 sm:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit Post</h1>
              <p className="text-sm text-slate-500 mt-1">Update the details of your listing</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold text-sm hover:bg-red-600 hover:text-white transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeleting ? "Deleting..." : "Delete Post"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="title" className={labelCls}>Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={post.title}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="price" className={labelCls}>Price (₹)</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                defaultValue={post.price}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="address" className={labelCls}>Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                defaultValue={post.address}
                className={inputCls}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="desc" className={labelCls}>Description</label>
              <TiptapEditor value={value} onChange={setValue} />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="city" className={labelCls}>City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                defaultValue={post.city}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="bedroom" className={labelCls}>Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                required
                defaultValue={post.bedroom}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="bathroom" className={labelCls}>Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                required
                defaultValue={post.bathroom}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="type" className={labelCls}>Type</label>
              <select
                name="type"
                required
                defaultValue={post.type}
                className={inputCls}
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="property" className={labelCls}>Property Type</label>
              <select
                name="property"
                required
                defaultValue={post.property}
                className={inputCls}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="latitude" className={labelCls}>Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                required
                defaultValue={post.latitude}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="longitude" className={labelCls}>Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                required
                defaultValue={post.longitude}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="utilities" className={labelCls}>Utilities</label>
              <select
                name="utilities"
                defaultValue={post.postDetail.utilities}
                className={inputCls}
              >
                <option value="owner">Owner pays</option>
                <option value="tenant">Tenant pays</option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="parking" className={labelCls}>Parking Policy</label>
              <select
                name="parking"
                defaultValue={post.postDetail.parking}
                className={inputCls}
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="advance" className={labelCls}>Advance Policy</label>
              <select
                name="advance"
                defaultValue={post.postDetail.advance}
                className={inputCls}
              >
                <option value="Required">Required</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="size" className={labelCls}>Size (sqft)</label>
              <input
                id="size"
                name="size"
                type="number"
                min="0"
                defaultValue={post.postDetail.size}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="school" className={labelCls}>Schools Nearby</label>
              <input
                id="school"
                name="school"
                type="number"
                min="1"
                max="10"
                defaultValue={post.postDetail.school}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="bus" className={labelCls}>Bus Stops Nearby</label>
              <input
                id="bus"
                name="bus"
                type="number"
                min="0"
                defaultValue={post.postDetail.bus}
                className={inputCls}
              />
            </div>

            <div className="w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-2">
              <label htmlFor="restaurant" className={labelCls}>Restaurants Nearby</label>
              <input
                id="restaurant"
                name="restaurant"
                type="number"
                min="0"
                defaultValue={post.postDetail.restaurant}
                className={inputCls}
              />
            </div>

            <div className="w-full flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-emerald-600 text-white font-bold px-8 py-4 cursor-pointer hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-600/30 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </button>
              {error && <div className="flex-1 text-red-600 p-4 rounded-xl bg-red-50 border border-red-100 text-sm">{error}</div>}
            </div>
          </form>
        </div>
      </div>
      <div className="flex-[2] bg-white border-l border-slate-200 flex flex-col gap-5 items-center justify-center p-5 overflow-y-auto">
        {/* Image upload section */}
        <div className="w-full max-w-md">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Property Photos</h3>
          <p className="text-sm text-slate-500 mb-5">Manage the photos of your listing</p>
        </div>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt=""
              className="w-full max-w-md h-[180px] object-cover rounded-xl shadow-sm border border-slate-200"
            />
          ))
        ) : (
          <div className="w-full max-w-md border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-500 text-sm font-medium">No images uploaded yet</p>
            <p className="text-slate-400 text-xs mt-1">Upload some images to showcase your property</p>
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