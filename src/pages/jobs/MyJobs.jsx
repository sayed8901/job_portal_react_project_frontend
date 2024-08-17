import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import salaryIcon from "../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../assets/icons8-date-50.png";
import jobTypeIcon from "../../assets/icons8-business-time-30.png";
import locationIcon from "../../assets/icons8-location.gif";
import jobEducationIcon from "../../assets/icons8-education-50.png";
import { toast } from "react-toastify";
import useTitle from "../../utilities/useTitle";

const MyJobs = () => {
  useTitle("My Jobs");

  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("authToken");
  const employer_id = localStorage.getItem("employer_id");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_posts/my_advertisements/?employer_id=${employer_id}`,
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
        setJobs(data);
      })
      .catch((err) => console.log(err));
  }, [employer_id, token]);

  const handleDeleteJob = (job_post_id) => {
    fetch(`${import.meta.env.VITE_API_URL}/job_posts/all/${job_post_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          return Promise.reject("Failed to delete the job post.");
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        }
        toast.success("Job post successfully deleted.");
        setJobs(jobs.filter((job) => job.id !== job_post_id));
        navigate("/my_jobs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white py-16 sm:py-24 text-gray-900 w-full sm:w-5/6 md:w-3/4 mx-auto">
      <h2 className="text-center text-3xl font-semibold leading-8 text-gray-900 mt-10 mb-20">
        My Posted Jobs
      </h2>
      <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto px-6 lg:px-8">
        Here are all your posted jobs. You can check out & update the details of
        your application below. You can also view the applications received from
        job seekers for each job circular you have posted.
      </p>

      {jobs.map((post) => {
        const currentDate = new Date();
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
                  <img
                    className="w-6 mx-2 sm:ms-0 sm:me-2"
                    src={jobTypeIcon}
                    alt=""
                  />
                  {post.employment_status}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={locationIcon} alt="" />
                  {post.job_location}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={jobEducationIcon} alt="" />
                  {post.education}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={salaryIcon} alt="" />
                  BDT {post.salary}/-
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={calenderIcon} alt="" />
                  Published on {post.job_posted_on}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <img className="w-6 mx-2" src={calenderIcon} alt="" />
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
      })}
    </div>
  );
};

export default MyJobs;
