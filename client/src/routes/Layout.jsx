import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="flex-1 h-[calc(100vh-100px)]">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="h-screen max-w-[1366px] mx-auto px-5 flex flex-col">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="flex-1 h-[calc(100vh-100px)]">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
