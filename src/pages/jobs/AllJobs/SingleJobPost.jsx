import { Link } from "react-router-dom";
import Countdown from "../../../components/CountdownTimer";
import salaryIcon from "../../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../../assets/icons8-date-50.png";
import jobTypeIcon from "../../../assets/icons8-business-time-30.png";
import locationIcon from "../../../assets/icons8-location.gif";
import jobEducationIcon from "../../../assets/icons8-education-50.png";
import PropTypes from "prop-types";

const SingleJobPost = ({ post }) => {
  const isLive = new Date(post.deadline + "T23:59:59Z") > new Date();

  return (
    <div
      key={post.id}
      className="lg:flex lg:items-center lg:justify-between mx-5 md:mx-10 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex justify-start items-center gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-bold text-gray-900 sm:truncate sm:tracking-tight">
              {post.job_title}
            </h2>

            {/* Live / Expired part */}
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

          <div>
            {/* Countdown Timer Component */}
            {isLive && <Countdown deadline={post.deadline} postId={post.id} />}
          </div>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 sm:truncate sm:tracking-tight mt-2 mb-5">
          {post.employer.company_name}
        </h2>

        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
          <div className="sm:mt-2 flex items-center text-sm text-gray-500">
            <img
              className="w-6 fluid mx-2 sm:ms-0 sm:me-2"
              src={jobTypeIcon}
              alt="Job Type"
            />
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
            <img className="w-6 mx-2" src={calenderIcon} alt="Deadline" />
            Closing on {post.deadline}
          </div>
        </div>
      </div>

      <Link
        to={`/job_post_details/${post.id}`}
        className="inline-flex items-center rounded-md bg-indigo-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-indigo-300 my-5"
      >
        View Details
      </Link>
    </div>
  );
};

// PropTypes validation
SingleJobPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default SingleJobPost;
