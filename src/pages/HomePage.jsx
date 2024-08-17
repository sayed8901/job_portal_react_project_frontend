import Banner from "../components/Banner";
import TopCareerAdvice from "../components/TopCareerAdvice";
import TopCompanies from "../components/TopCompanies";
import useTitle from "../utilities/useTitle";
import AllJobs from "./jobs/AllJobs";

const HomePage = () => {
  useTitle();

  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <TopCompanies></TopCompanies>
      <TopCareerAdvice></TopCareerAdvice>
      <div className="-mt-16 sm:-mt-24">
        <AllJobs></AllJobs>
      </div>
    </div>
  );
};

export default HomePage;
