import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "../../utilities/useTitle";

import userIcon from "../../assets/profile_img.png";
import salaryIcon from "../../assets/icons8-bangladesh-24.png";
import calenderIcon from "../../assets/icons8-date-50.png";
import jobTypeIcon from "../../assets/icons8-business-time-30.png";
import locationIcon from "../../assets/icons8-location.gif";
import jobEducationIcon from "../../assets/icons8-education-50.png";

const ApplicantsOfJob = () => {
  useTitle("Applicants");

  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem("authToken");
  const employer_id = localStorage.getItem("employer_id");
  const { post_id } = useParams();

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_applications/applications_for_a_job_post/?job_post_id=${post_id}&employer_id=${employer_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      })
      .catch((err) => console.log(err));
  }, [post_id, employer_id, token]);

  return (
    <div className="bg-white px-8 py-12 sm:py-16 text-gray-900 mx-auto">
      <h2 className="text-center text-3xl font-semibold leading-8 text-gray-900 my-10">
        Applicants List
      </h2>
      <p className="text-center text-lg leading-8 text-gray-900 mt-8 mb-16 w-full sm:w-3/4 mx-auto">
        You can check out the list of the applications received from job seekers
        to your job post.
      </p>

      {applicants.map((applicant, index) => (
        <div
          //   key={applicant.job_seeker.user.id}
          key={index}
          className="lg:flex lg:items-center lg:justify-between sm:mx-5 my-10 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out rounded-xl p-5"
        >
          <div className="min-w-0 flex-1">
            <div className="sm:flex gap-2 items-end mb-5">
              <div className="flex items-center">
                <img className="w-6 mx-2" src={userIcon} alt="" />
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {applicant.job_seeker.user.first_name}{" "}
                  {applicant.job_seeker.user.last_name}{" "}
                </h2>
              </div>
              <div className="text-xl font-normal flex gap-2">
                <h5 className="font-normal">( Username :</h5>{" "}
                <span className="font-bold">
                  {applicant.job_seeker.user.username}
                </span>{" "}
                )
              </div>
            </div>

            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-4 md:space-x-8">
              <div className="sm:mt-2 flex items-center text-sm text-gray-500 my-3">
                <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
                  <span className="font-normal">Email:</span>{" "}
                  {applicant.job_seeker.user.email}
                </p>
              </div>
              <div className="sm:mt-2 flex items-center text-sm text-gray-500 my-3">
                <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
                  <span className="font-normal">Contact No:</span>{" "}
                  {applicant.job_seeker.contact_no}
                </p>
              </div>
            </div>

            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-4 md:space-x-8">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <p>
                  Fathers Name:{" "}
                  <span className="font-bold text-black">
                    {applicant.job_seeker.fathers_name}
                  </span>
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <p>
                  Mothers Name:{" "}
                  <span className="font-bold text-black">
                    {applicant.job_seeker.mothers_name}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-4 md:space-x-8">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <img className="w-6 mx-2" src={locationIcon} alt="" />
                <p>Address: {applicant.job_seeker.address}</p>
              </div>
              <div className="flex flex-start gap-5 md:gap-10">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <p>Sex: {applicant.job_seeker.sex}</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <p>Age: {applicant.job_seeker.age}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <img className="w-6 mx-2" src={calenderIcon} alt="" />
                <p>Applied on: {applicant.applied_on}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-between lg:flex-col flex-wrap lg:gap-2 mt-5 lg:mt-0">
            <div>
              {/* Customized Resume link to view the attachment file */}
              {/* temporarily disable for vercel deployment purpose */}
              {/* <div className="sm:mt-2 mb-2 flex items-center text-sm text-gray-500 bg-gray-300 rounded-full px-3 py-2 animate-pulse">
                <img className="w-6 -ml-1 mr-2" src={userIcon} alt="" />
                <a
                  href={`${import.meta.env.VITE_API_URL}/${applicant.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={applicant.resume}
                  className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight"
                >
                  Customized Resume
                </a>
              </div> */}

              <div className="sm:mt-2 flex items-center text-sm text-gray-500">
                <img className="w-6 mx-2" src={jobEducationIcon} alt="" />
                <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  <span className="font-normal">Education:</span>{" "}
                  {applicant.job_seeker.education}
                </p>
              </div>
            </div>

            <div>
              <div className="sm:mt-2 flex items-center text-sm text-gray-500 mb-0 sm:mb-6 lg:mb-0">
                <img className="w-6 mx-2" src={jobTypeIcon} alt="" />
                <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  <span className="font-normal">Experience:</span>{" "}
                  {applicant.job_seeker.experience}
                </p>
              </div>
              <div className="sm:mt-2 flex items-center text-sm text-gray-500">
                <img className="w-6 mx-2" src={salaryIcon} alt="" />
                <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  <span className="font-normal">Expectation:</span>{" "}
                  {applicant.salary}/-
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicantsOfJob;
