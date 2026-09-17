import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password, a } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex h-full bg-slate-50">
      <div className="flex-[3] flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Update Profile</h1>
            <p className="text-sm text-slate-500 mt-1">Keep your details up to date</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800"
            />
          </div>
          <button 
            type="submit"
            className="py-3.5 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-600/30"
          >
            Update
          </button>
          {error && <span className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</span>}
        </form>
      </div>
      <div className="flex-[2] bg-emerald-50/60 flex flex-col gap-5 items-center justify-center p-4">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
          <img 
            src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <UploadWidget uwConfig={{ cloudName: "dslrhfcwf", 
          uploadPreset: "propease", 
          multiple:false, 
          maxImageFileSize: 2000000,
          folder : "avatars",
           }} setState={setAvatar} 
           />
        <p className="text-xs text-slate-500 text-center max-w-[240px]">
          Upload a clear photo so buyers can recognise you easily
        </p>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;