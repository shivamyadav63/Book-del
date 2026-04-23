import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const [authUser] = useAuth();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      {/* 🔥 Protected Course Link */}
      <li>
        <Link
          to={authUser ? "/course" : "/login"}
          state={{ from: "/course" }}
        >
          Course
        </Link>
      </li>

      <li>
        <a>Contact</a>
      </li>
      <li>
        <a>About</a>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black fixed top-0 left-0 right-0 z-50 ${
        sticky ? "shadow-md duration-300 transition-all" : ""
      }`}
    >
      <div className="navbar">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
              {navItems}
            </ul>
          </div>

          <h1 className="text-2xl font-bold cursor-pointer">
            BookStore
          </h1>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end space-x-3">
          {/* Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border rounded-md outline-none"
            />
          </div>

          {/* Auth */}
          {authUser ? (
            <Logout />
          ) : (
            <>
              <Link to="/login">
                <button className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;