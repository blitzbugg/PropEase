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
    <div className="flex h-full">
      <div className="flex-[3] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md p-4">
          <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              className="p-5 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className="p-5 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className="p-5 rounded border border-gray-300"
            />
          </div>
          <button 
            type="submit"
            className="p-5 rounded bg-teal-600 text-white font-bold cursor-pointer hover:bg-teal-700 transition-colors"
          >
            Update
          </button>
          {error && <span className="text-red-500">{error}</span>}
        </form>
      </div>
      <div className="flex-[2] bg-rose-50 flex flex-col gap-5 items-center justify-center p-4">
        <img 
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} 
          alt="Profile" 
          className="w-1/2 object-cover rounded-full aspect-square"
        />
        <UploadWidget uwConfig={{ cloudName: "dslrhfcwf", 
          uploadPreset: "propease", 
          multiple:false, 
          maxImageFileSize: 2000000,
          folder : "avatars",
           }} setState={setAvatar} 
           />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;