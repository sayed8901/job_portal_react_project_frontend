import { Link } from "react-router-dom";
import banner from "../assets/banner-photo.avif";

const Banner = () => {
  return (
    <div className="relative py-24 sm:py-32">
      {/* Container for Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={banner}
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Text content positioned above the background image */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-12">
            Welcome to <span className="text-indigo-400">BD Job Portal</span>,
            your trusted job partner.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 font-bold">
            By browsing our huge collection of job openings across renowned
            organizations, you can easily find and apply to the job posts of
            your preference.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <div className="flex justify-center gap-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 lg:gap-x-10">
            <Link
              className="hover:text-indigo-300"
              to="/all_jobs_by_category" // Replace with the actual route
            >
              View Job Vacancies
              <span className="mr-12" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link
              className="hover:text-indigo-300"
              to="/login" // Replace with the actual route
            >
              Join Now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col-reverse text-center">
              <dt className="text-base md:text-lg leading-7 text-gray-300">
                Job Openings
              </dt>
              <dd className="text-2xl md:text-3xl font-bold leading-9 tracking-tight text-indigo-400">
                100+
              </dd>
            </div>
            <div className="flex flex-col-reverse text-center">
              <dt className="text-base md:text-lg leading-7 text-gray-300">
                Company connected
              </dt>
              <dd className="text-2xl md:text-3xl font-bold leading-9 tracking-tight text-indigo-400">
                30+
              </dd>
            </div>
            <div className="flex flex-col-reverse text-center">
              <dt className="text-base md:text-lg leading-7 text-gray-300">
                Job categories
              </dt>
              <dd className="text-2xl md:text-3xl font-bold leading-9 tracking-tight text-indigo-400">
                10+
              </dd>
            </div>
            <div className="flex flex-col-reverse text-center">
              <dt className="text-base md:text-lg leading-7 text-gray-300">Apply</dt>
              <dd className="text-2xl md:text-3xl font-bold leading-9 tracking-tight text-indigo-400">
                Unlimited
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Banner;
