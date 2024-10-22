import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/front_page-icon.jpg";
import userIcon from "../assets/profile_img.png";

import { UserContext } from "../authentication/Contexts"; // Importing the user context

const Navbar = () => {
  const { user, updateUser } = useContext(UserContext); // Get user state from context
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info from localStorage
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("user_type");

    if (username && userType) {
      updateUser({ username, userType });
    }
  }, []); // N.B.: No dependencies, so this will run only once

  // Handle logout logic
  const handleLogout = () => {
    localStorage.clear();

    updateUser({
      username: null,
      userType: null,
    });

    // redirecting to homepage
    navigate("/");
  };

  const renderMenuItems = () => {
    if (user.userType === "employer") {
      return (
        <div className="flex flex-row justify-evenly gap-5 sm:gap-3 items-center">
          <NavLink
            to="/publish_new_job"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Post New Job
          </NavLink>
          <NavLink
            to="/my_jobs"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            My Jobs
          </NavLink>
        </div>
      );
    } else if (user.userType === "job_seeker") {
      return (
        <NavLink
          to="/my_applications"
          className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
        >
          My Applications
        </NavLink>
      );
    }
    return null;
  };

  const renderAuthItems = () => {
    if (user.username && user.userType) {
      return (
        <div className="flex gap-3">
          <NavLink
            to={`/${user.userType}_profile`}
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Profile
          </NavLink>
          <button
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
          <NavLink
            to="/login"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/job_seeker_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Applicant Registration
          </NavLink>
          <NavLink
            to="/employer_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Employer Registration
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-800 sm:fixed z-20 w-full">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex flex-row gap-16 sm:gap-3 md:gap-8 lg:gap-16 h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto pl-3 sm:pl-0"
                src={logo}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex flex-row gap-1 md:gap-5 items-center">
                <NavLink
                  to="/"
                  className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all_jobs_by_category"
                  className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
                >
                  All Jobs
                </NavLink>

                {/* conditionally rendering additional menu items */}
                {renderMenuItems()}
              </div>
            </div>
          </div>

          <div className="flex ">
            <div
              id="logged_in_user_info"
              className={`flex flex-col items-center justify-center ml-1 mr-4 ${
                user.username ? "" : "hidden"
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-1">
                <p className="font-bold text-sm text-green-300">
                  {user.username}
                </p>
                <img
                  className="h-4 w-4 rounded-full -mr-2"
                  src={userIcon}
                  alt="Profile Icon"
                  style={{ filter: "invert(100%)" }}
                />
              </div>
              <p className="text-white text-sm">( {user.userType} )</p>
            </div>

            <div className="flex items-center" id="navbar-element-auth">
              {/* conditionally rendering additional login & logout menu items */}
              {renderAuthItems()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="flex justify-around items-center px-2 pb-3 pt-2">
          <NavLink
            to="/"
            className="block rounded-md px-3 py-2 text-sm font-medium text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/all_jobs_by_category"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            All Jobs
          </NavLink>

          {/* conditionally rendering additional menu items for mobile screen */}
          {renderMenuItems()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
