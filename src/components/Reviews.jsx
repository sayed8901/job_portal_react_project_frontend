import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

// react awesome rating
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// react icon
import { FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-16 sm:my-24 mx-6 text-gray-900" name="reviews">
      <div className="sm:w-3/4 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mt-16">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
        <p className="py-12 text-center">
          We are always excited to share our employers, applicants and other
          stakeholders thought & also concerned about their feedbacks.
        </p>
      </div>

      {/* swiper content goes here */}
      <Carousel autoPlay infiniteLoop>
        {reviews.map((review) => (
          <div key={review.id} className="text-center">
            <div className="flex flex-col items-center gap-4">
              <Rating
                style={{ maxWidth: 250 }}
                value={review.rating}
                readOnly
              />
              <p>{review.rating} out of 5</p>
              <div className="flex justify-center items-center gap-6 mb-4 lg:mb-8">
                <FaQuoteLeft className="text-2xl md:text-4xl" />
                <span className="text-xl md:text-2xl">{review.title}</span>
              </div>
              <p>{review.details}</p>
              <h3 className="text-indigo-600 uppercase text-2xl mb-8">
                {review.name}{" "}
                <span className="text-sm">({review.reviewer_type})</span>
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
