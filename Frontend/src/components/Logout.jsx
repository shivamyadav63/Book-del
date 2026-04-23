import React from "react";
import { useAuth } from "../context/AuthProvider";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-2 rounded-md"
    >
      Logout
    </button>
  );
}

export default Logout;