// ApplicationPost.jsx
import { useNavigate } from "react-router-dom";
import salaryIcon from "../../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../../assets/icons8-date-50.png";
import jobTypeIcon from "../../../assets/icons8-business-time-30.png";
import locationIcon from "../../../assets/icons8-location.gif";
import jobEducationIcon from "../../../assets/icons8-education-50.png";
import PropTypes from "prop-types";

const MySingleApplication = ({ application, onWithdraw }) => {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    onWithdraw(application.id);
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between mx-5 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5">
          {application.job_post.job_title}
        </h2>

        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
          <div className="mt-2 mb-5 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={salaryIcon} alt="" />
            <p className="text-lg">
              Salary Expectation:{" "}
              <span className="font-bold">BDT {application.salary}/-</span>
            </p>
          </div>
          <div className="mt-2 mb-5 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={calenderIcon} alt="" />
            <p className="text-lg">
              Applied on:{" "}
              <span className="font-bold">{application.applied_on}</span>
            </p>
          </div>
        </div>

        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
          <div className="sm:mt-2 flex items-center text-sm text-gray-500">
            <img
              className="w-6 mx-2 sm:ms-0 sm:me-2"
              src={jobTypeIcon}
              alt=""
            />
            {application.job_post.employment_status}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={locationIcon} alt="" />
            {application.job_post.job_location}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={jobEducationIcon} alt="" />
            {application.job_post.education}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={salaryIcon} alt="" />
            BDT {application.job_post.salary}/-
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <img className="w-6 mx-2" src={calenderIcon} alt="" />
            Closing on {application.job_post.deadline}
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col justify-center mt-5 lg:mt-0">
        <button
          type="button"
          onClick={() =>
            navigate(`/job_post_details/${application.job_post.id}`)
          }
          className="inline-flex items-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 mx-2 my-5"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={handleWithdraw}
          className="inline-flex items-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200 mx-2 my-5"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
MySingleApplication.propTypes = {
  application: PropTypes.object.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};

export default MySingleApplication;
