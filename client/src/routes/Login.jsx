import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";


function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      const formData = new FormData(e.target);
  
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
     
      try {
        const res = await apiRequest.post("/auth/login", {
          username,
          password,
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        
        
        navigate("/");
      }
      catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-8 mb-32">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
            <input
              name="username"
              required
              minLength={3}
              maxLength={20}
              type="text"
              placeholder="Username"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button disabled={isLoading}
              className="py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
            
            {error && <span className="text-red-500 text-sm">{error}</span>}
            
            <Link to="/register" className="text-blue-600 hover:text-blue-800 text-sm text-center">
              Don't you have an account?
            </Link>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img src="/bg.png" alt="Real estate illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Login;