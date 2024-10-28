import { useEffect, useState } from "react";
import useTitle from "../../../utilities/useTitle";
import SingleJobPost from "./SingleJobPost";

const AllJobs = () => {
  useTitle("All Jobs");

  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState(""); // State to track the active category

  // Fetch categories and jobs when the component mounts
  useEffect(() => {
    fetchCategories();
    getJobs();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category/`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Function to fetch and display jobs dynamically
  const getJobs = async (categorySlugName = "") => {
    try {
      // initially, to load all jobs data by default
      let url = `${import.meta.env.VITE_API_URL}/job_posts/all_paid/`;

      if (categorySlugName) {
        // load jobs for a category only if category is selected
        url = `${
          import.meta.env.VITE_API_URL
        }/job_posts/job_posts_of_a_category/?slug=${categorySlugName}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);
      setActiveCategory(categorySlugName); // Update the active category state
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div id="jobs-category" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" id="category-container">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 mt-10 mb-20">
            Find Jobs <span className="text-gradient">by Category</span>
          </h2>
          <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto">
            Check out all the available jobs from below. You can also find the
            specific jobs based on the job category.
          </p>
          <div className="flex flex-wrap justify-evenly mx-auto mt-10 mb-16 items-center gap-x-6 gap-y-2 lg:mx-0">
            {categories.map((cat) => (
              <a
                href="#" 
                className={`animated-border px-2 py-2 text-sm font-semibold text-center ${
                  activeCategory === cat.slug ? "bg-indigo-200 rounded-xl" : "" // Change background for active category
                }`}
                key={cat.slug}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  getJobs(cat.slug); // Call getJobs with the selected category
                }}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* All Jobs Section */}
        <div id="all-jobs" className="my-8">
          {jobs.map((post) => (
            <SingleJobPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
