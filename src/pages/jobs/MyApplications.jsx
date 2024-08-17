import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import salaryIcon from "../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../assets/icons8-date-50.png";
import jobTypeIcon from "../../assets/icons8-business-time-30.png";
import locationIcon from "../../assets/icons8-location.gif";
import jobEducationIcon from "../../assets/icons8-education-50.png";
import { toast } from "react-toastify";
import useTitle from "../../utilities/useTitle";

const MyApplications = () => {
  useTitle("My Applications");

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const jobSeekerId = localStorage.getItem("job_seeker_id");

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_applications/my_applications/?job_seeker_id=${jobSeekerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [jobSeekerId, token]);

  const handleWithdrawApplication = (job_application_id) => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_applications/all/${job_application_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          return Promise.reject("Failed to withdraw application.");
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        }
        toast.success("Application successfully withdrawn.");
        setApplications(
          applications.filter((app) => app.id !== job_application_id)
        );
        navigate("/my_applications");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="bg-white py-16 sm:py-24 text-gray-900 w-full sm:w-5/6 md:w-3/4 mx-auto">
        <h2 className="text-center text-3xl font-semibold leading-8 text-gray-900 mt-10 mb-20">
          All Applications
        </h2>
        <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto px-6 lg:px-8">
          Here are your all applied jobs. You can check out the details of your
          application from below.
        </p>

        {applications.map((post) => (
          <div
            key={post.id}
            className="lg:flex lg:items-center lg:justify-between mx-5 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5"
          >
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5">
                {post.job_post.job_title}
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
                <div className="mt-2 mb-5 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={salaryIcon} alt="" />
                  <p className="text-lg">
                    Salary Expectation:{" "}
                    <span className="font-bold">BDT {post.salary}/-</span>
                  </p>
                </div>
                <div className="mt-2 mb-5 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={calenderIcon} alt="" />
                  <p className="text-lg">
                    Applied on:{" "}
                    <span className="font-bold">{post.applied_on}</span>
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
                  {post.job_post.employment_status}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={locationIcon} alt="" />
                  {post.job_post.job_location}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={jobEducationIcon} alt="" />
                  {post.job_post.education}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={salaryIcon} alt="" />
                  BDT {post.job_post.salary}/-
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={calenderIcon} alt="" />
                  Closing on {post.job_post.deadline}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  navigate(`/job_post_details/${post.job_post.id}`)
                }
                className="inline-flex items-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 mx-2 my-5"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => handleWithdrawApplication(post.id)}
                className="inline-flex items-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200 mx-2 my-5"
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
