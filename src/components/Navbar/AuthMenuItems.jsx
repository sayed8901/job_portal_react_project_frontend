import { NavLink } from "react-router-dom";
import userIcon from "../../assets/profile_img.png";
import PropTypes from "prop-types";

const AuthMenuItems = ({ user, handleLogout }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Conditionally render items based on user authentication status */}
      {user.username && user.userType ? (
        <div className="flex gap-3 items-center">
          {/* Profile Info Display */}
          <div
            className={`flex flex-col items-center justify-center ml-1 mr-4`}
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
            <p className="text-white text-sm">({user.userType})</p>
          </div>
          <NavLink
            to={`/${user.userType}_profile`}
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <NavLink
            to="/login"
            className="rounded-md p-4 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/job_seeker_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
          >
            Applicant Registration
          </NavLink>
          <NavLink
            to="/employer_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
          >
            Employer Registration
          </NavLink>
        </>
      )}
    </div>
  );
};

// PropTypes validation
AuthMenuItems.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default AuthMenuItems;
