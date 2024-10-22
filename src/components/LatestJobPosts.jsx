import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SingleJobPost from "../pages/jobs/AllJobs/SingleJobPost";

const LatestJobCircular = () => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    // Fetch job posts data from your API or local file
    fetch(`${import.meta.env.VITE_API_URL}/job_posts/all/`)
      .then((res) => res.json())
      .then((data) => setJobPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-16 sm:my-24 mx-6 text-gray-900" name="reviews">
      <div className="sm:w-3/4 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mt-16">
          <span className="text-gradient">Latest</span> Job Circulars
        </h2>
        <p className="pt-12 text-center">
          You can always check out the latest job circulars to apply and stay
          ahead of other applicants.
        </p>
      </div>

      {/* <!-- slider with marquee --> */}
      <Marquee
        speed={100}
        pauseOnHover={true}
        className="bg-white py-3 py-lg-4"
      >
        {jobPosts.map((job) => (
          <div key={job.id} className="flex-shrink-0 mx-1 sm:mx-2 lg:mx-4">
            <div className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-3xl flex flex-col">
              <SingleJobPost post={job} />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LatestJobCircular;
