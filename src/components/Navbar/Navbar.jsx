import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/front_page-icon.jpg";

import MainMenuItems from "./MainMenuItems";
import AuthMenuItems from "./AuthMenuItems";

import { UserContext } from "../../authentication/Contexts"; // Importing the user context

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

  // const renderMenuItems = () => {
  //   if (user.userType === "employer") {
  //     return (
  //       <div className="flex flex-row justify-evenly gap-2 sm:gap-3 items-center">
  //         <NavLink
  //           to="/publish_new_job"
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
  //         >
  //           Post New Job
  //         </NavLink>
  //         <NavLink
  //           to="/my_jobs"
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
  //         >
  //           My Jobs
  //         </NavLink>
  //       </div>
  //     );
  //   } else if (user.userType === "job_seeker") {
  //     return (
  //       <NavLink
  //         to="/my_applications"
  //         className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
  //       >
  //         My Applications
  //       </NavLink>
  //     );
  //   }
  //   return null;
  // };

  // const renderAuthItems = () => {
  //   if (user.username && user.userType) {
  //     return (
  //       <div className="flex gap-3">
  //         <NavLink
  //           to={`/${user.userType}_profile`}
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
  //         >
  //           Profile
  //         </NavLink>
  //         <button
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
  //           onClick={handleLogout}
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <NavLink
  //           to="/login"
  //           className="rounded-md p-4 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
  //         >
  //           Login
  //         </NavLink>
  //         <NavLink
  //           to="/job_seeker_register"
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
  //         >
  //           Applicant Registration
  //         </NavLink>
  //         <NavLink
  //           to="/employer_register"
  //           className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
  //         >
  //           Employer Registration
  //         </NavLink>
  //       </>
  //     );
  //   }
  // };

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
                {/* conditionally rendering additional menu items */}
                <MainMenuItems user={user} />
              </div>
            </div>
          </div>

          <div className="flex items-center" id="navbar-element-auth">
            {/* conditionally rendering additional login & logout menu items */}
            <AuthMenuItems user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="flex justify-around items-center px-2 pb-3 pt-2">
          {/* conditionally rendering additional menu items for mobile screen */}
          <MainMenuItems user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
