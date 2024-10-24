import { Link } from "react-router-dom";
import salaryIcon from "../../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../../assets/icons8-date-50.png";
import jobTypeIcon from "../../../assets/icons8-business-time-30.png";
import locationIcon from "../../../assets/icons8-location.gif";
import jobEducationIcon from "../../../assets/icons8-education-50.png";
import PropTypes from "prop-types";

const MySingleJobPost = ({ post, handleDeleteJob }) => {
  const currentDate = new Date();
  // Convert the job post deadline to UTC for comparison purposes
  const isLive = new Date(post.deadline + "T23:59:59Z") > currentDate;

  return (
    <div
      key={post.id}
      className="lg:flex lg:items-center lg:justify-between mx-5 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5"
    >
      <div className="min-w-0 flex-1">
        <div className="flex justify-start items-center gap-3">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {post.job_title}
          </h2>

          {isLive ? (
            <p className="bg-green-200 text-sm text-green-800 px-3 py-1 rounded animate-bounce">
              Live
            </p>
          ) : (
            <p className="bg-red-200 text-sm text-red-800 px-3 py-1 rounded animate-pulse">
              Expired
            </p>
          )}
        </div>

        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
          <div className="sm:mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={jobTypeIcon} alt="Job Type" />
            {post.employment_status}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={locationIcon} alt="Location" />
            {post.job_location}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={jobEducationIcon} alt="Education" />
            {post.education}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={salaryIcon} alt="Salary" />
            BDT {post.salary}/-
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={calenderIcon} alt="Published on" />
            Published on {post.job_posted_on}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={calenderIcon} alt="Closing on" />
            Closing on {post.deadline}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Link
          to={`/applicants_of_a_job/${post.id}`}
          className="inline-flex items-center rounded-md bg-blue-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-200 mx-2 my-3"
        >
          Applications
        </Link>

        <Link
          to={`/update_job_details/${post.id}`}
          className="inline-flex items-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 mx-2 my-3"
        >
          Update Job
        </Link>

        <button
          onClick={() => handleDeleteJob(post.id)}
          className="inline-flex items-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200 mx-2 my-3"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
MySingleJobPost.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeleteJob: PropTypes.func.isRequired,
};

export default MySingleJobPost;
