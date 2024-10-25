import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MainMenuItems = ({ user }) => {
  return (
    <>
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
      {user.userType === "employer" && (
        <>
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
        </>
      )}
      {user.userType === "job_seeker" && (
        <NavLink
          to="/my_applications"
          className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
        >
          My Applications
        </NavLink>
      )}
      <NavLink
        to="/contact"
        className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
      >
        Contact
      </NavLink>
    </>
  );
};

// PropTypes validation
MainMenuItems.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MainMenuItems;
