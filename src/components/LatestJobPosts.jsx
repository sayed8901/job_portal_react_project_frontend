import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

import SingleJobPost from "../pages/jobs/AllJobs/SingleJobPost";
import "@smastrom/react-rating/style.css";

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
    <div className="my-16 sm:my-24 mx-6" name="reviews">
      <div className="sm:w-3/4 mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-center mt-16">
          <span className="text-gradient">Latest</span> Job Circulars
        </h2>
        <p className="py-12 text-center">
          You can always check out the latest job circulars to apply and stay
          ahead of other applicants.
        </p>
      </div>

      {/* swiper content goes here */}
      <Carousel autoPlay infiniteLoop>
        {jobPosts.map((job) => (
          <div key={job.id} className="text-center">
            <SingleJobPost post={job} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestJobCircular;
