import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import salaryIcon from "../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../assets/icons8-date-50.png";
import jobTypeIcon from "../../assets/icons8-business-time-30.png";
import locationIcon from "../../assets/icons8-location.gif";
import jobEducationIcon from "../../assets/icons8-education-50.png";
import useTitle from "../../utilities/useTitle";

const AllJobs = () => {
  useTitle("All Jobs");

  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const countdownIntervals = {};

  // Fetch categories and jobs when the component mounts
  useEffect(() => {
    fetchCategories();
    getJobs();

    // Cleanup intervals when the component unmounts
    return () => {
      for (const intervalId in countdownIntervals) {
        clearInterval(countdownIntervals[intervalId]);
      }
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category/`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const getJobs = async (categorySlugName = "") => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/job_posts/all/`;

      if (categorySlugName) {
        url = `${
          import.meta.env.VITE_API_URL
        }/job_posts/job_posts_of_a_category/?slug=${categorySlugName}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);

      data.forEach((post) => {
        const currentDate = new Date();
        const deadline = new Date(post.deadline + "T23:59:59Z");

        if (deadline > currentDate) {
          const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownContainer = document.getElementById(
              `countdown-${post.id}`
            );

            if (countdownContainer) {
              countdownContainer.classList.add("countdown");
              countdownContainer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
            } else {
              clearInterval(countdownIntervals[post.id]);
              delete countdownIntervals[post.id];
            }
          }, 1000);

          countdownIntervals[post.id] = intervalId;
        }
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div id="jobs-category" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" id="category-container">
          <h2 className="text-center text-3xl font-semibold leading-8 text-gray-900 mt-10 mb-20">
            Find Jobs by Category
          </h2>
          <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto">
            Check out all the available jobs from below. You can also find the
            specific jobs based on the job category.
          </p>
          <div className="flex flex-wrap justify-evenly mx-auto mt-10 mb-16 items-center gap-x-6 gap-y-2 lg:mx-0">
            {categories.map((cat) => (
              <a
                href="#"
                className="animated-border px-3.5 py-2.5 text-sm font-semibold text-center"
                key={cat.slug}
                onClick={() => getJobs(cat.slug)}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* All Jobs Section */}
        <div id="all-jobs" className="my-8">
          {jobs.map((post) => (
            <div
              key={post.id}
              className="lg:flex lg:items-center lg:justify-between mx-5 md:mx-10 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center gap-3">
                  <div className="flex justify-start items-center gap-3">
                    <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl md:text-3xl sm:tracking-tight">
                      {post.job_title}
                    </h2>
                    {new Date(post.deadline + "T23:59:59Z") > new Date() ? (
                      <p className="bg-green-200 text-sm text-green-800 px-3 py-1 rounded animate-bounce">
                        Live
                      </p>
                    ) : (
                      <p className="bg-red-200 text-sm text-red-800 px-3 py-1 rounded animate-pulse">
                        Expired
                      </p>
                    )}
                  </div>
                  <p id={`countdown-${post.id}`}></p>
                </div>
                <h2 className="text-lg leading-7 text-gray-900 sm:truncate sm:text-xl md:text-2xl sm:tracking-tight  mt-2 mb-5">
                  {post.employer.company_name}
                </h2>
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
                    <img
                      className="w-6 mx-2"
                      src={locationIcon}
                      alt=""
                    />
                    {post.job_location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 mx-2"
                      src={jobEducationIcon}
                      alt=""
                    />
                    {post.education}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 mx-2"
                      src={salaryIcon}
                      alt=""
                    />
                    BDT {post.salary}/-
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 mx-2"
                      src={calenderIcon}
                      alt=""
                    />
                    Closing on {post.deadline}
                  </div>
                </div>
              </div>
              <Link
                to={`/job_post_details/${post.id}`}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 my-5"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
