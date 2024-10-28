import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../../../utilities/useTitle";

import MySingleJobPost from "./MySingleJobPost";

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
          // If response status is 204 No Content, no JSON to parse
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
    <div className="bg-white py-16 sm:py-24 text-gray-900 w-full sm:w-11/12 mx-auto">
      <h2 className="text-center text-3xl font-bold leading-8 text-gray-900 my-10">
        My <span className="text-gradient">Posted Jobs</span>
      </h2>
      <p className="text-center text-lg leading-8 text-gray-900 mt-8 mb-16 w-full sm:w-3/4 mx-auto px-6 lg:px-8">
        Here are all your posted jobs. You can check out & update the details of
        your application below. You can also view the applications received from
        job seekers for each job circular you have posted.
      </p>

      {jobs.map((post) => {
        return (
          <MySingleJobPost
            key={post.id}
            post={post}
            handleDeleteJob={handleDeleteJob}
          />
        );
      })}
    </div>
  );
};

export default MyJobs;
