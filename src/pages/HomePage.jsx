import LazyLoad from "react-lazy-load";
import Banner from "../components/Banner";
import TopCareerAdvice from "../components/TopCareerAdvice";
import TopCompanies from "../components/TopCompanies";
import useTitle from "../utilities/useTitle";
import AllJobs from "./jobs/AllJobs/AllJobs";
import Reviews from "../components/Reviews";
import LatestJobCircular from "../components/LatestJobPosts";
import Contact from "../components/Contact";

const HomePage = () => {
  useTitle("Home - BD Job Portal");

  return (
    <div className="container mx-auto">
      <LazyLoad>
        <Banner></Banner>
      </LazyLoad>
      <TopCompanies></TopCompanies>
      <TopCareerAdvice></TopCareerAdvice>
      <LatestJobCircular></LatestJobCircular>
      <div className="-mt-24 -mb-16 sm:-mt-36 sm:-mb-24">
        <AllJobs></AllJobs>
      </div>
      <Reviews></Reviews>
      <Contact></Contact>
    </div>
  );
};

export default HomePage;
