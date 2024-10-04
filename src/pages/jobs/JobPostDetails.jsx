import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import useTitle from "../../utilities/useTitle";
import { PDFDownloadLink } from "@react-pdf/renderer";
import JobDetailsPDF from "./JobPostDetailsPDF";

const JobDetails = () => {
  useTitle("Job Details");

  const [post, setPost] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { post_id } = useParams();
  const job_seeker_id = localStorage.getItem("job_seeker_id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/job_posts/all/${post_id}/`
        );
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.log("Error fetching job post details:", error);
      }
    };

    fetchData();
  }, [post_id]);

  // to check if the job_seeker already applied to the job post or not
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (job_seeker_id) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/job_applications/check_application/?job_post_id=${post_id}&job_seeker_id=${job_seeker_id}`,
            {
              method: "GET",
              headers: { Authorization: `Token ${token}` },
            }
          );
          const data = await response.json();
          setApplicationStatus(data.message);
        } catch (err) {
          console.log("Error checking application status:", err);
        }
      }
    };

    checkApplicationStatus();
  }, [post_id, job_seeker_id, token]);

  const handleOpenApplicationModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error message
    setSuccessMessage(""); // Clear previous success message
    setIsLoading(true); // Show loading spinner

    // sending formData directly to handle the file field data
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/job_applications/apply/?job_post_id=${post_id}&job_seeker_id=${job_seeker_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        toast.success(
          "Application successfully submitted. Check your email for confirmation."
        );
        console.log(successMessage);
        navigate("/my_applications");
      }
    } catch (err) {
      console.log("Error submitting application:", err);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }

    closeModal();
  };

  if (!post) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const currentDate = new Date();
  // Convert the job post deadline to UTC for comparison purposes
  const isExpired = new Date(post.deadline + "T23:59:59Z") < currentDate;

  return (
    <div className="container mx-auto px-2 sm:px-0 ">
      <div className="bg-white py-12 sm:py-16 text-gray-900 w-full sm:w-5/6 md:w-3/4 mx-auto px-4">
        <div className="lg:flex justify-between items-end gap-2 space-y-5 mt-16 mb-10">
          <div>
            <h2 className="text-3xl">{post.employer.company_name}</h2>
            <h1 className="text-4xl font-bold">{post.job_title}</h1>
          </div>
          <div className="lg:space-y-1">
            <p>
              Job Published on:{" "}
              <span className="font-bold">{post.job_posted_on}</span>
            </p>
            <p>
              Application Deadline:{" "}
              <span className="font-bold text-rose-800">{post.deadline}</span>
            </p>
          </div>
        </div>
        <hr />

        {/* PDF Download Button */}
        <div className="text-right">
          <PDFDownloadLink
            document={<JobDetailsPDF post={post} />}
            fileName={`${post.job_title}.pdf`}
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            Download PDF
          </PDFDownloadLink>
        </div>

        {/* Additional sections for the job details */}
        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">Summary</h1>
          <div className="mt-1 sm:mt-0 sm:flex sm:flex-row justify-between">
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Vacancy:</p>
              <p className="font-bold">{post.vacancy}</p>
            </div>
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Location:</p>
              <p className="font-bold">{post.job_location}</p>
            </div>
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Maximum Salary:</p>
              <p className="font-bold">BDT {post.salary}/-</p>
            </div>
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Requirements
          </h1>
          <div className="space-y-3">
            <p>
              <span className="font-bold">Education: </span>
              {post.education}
            </p>
            <p>
              <span className="font-bold">Experience: </span>
              {post.experience}
            </p>
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Responsibilities & Job Context
          </h1>
          <div className="space-y-3">
            <p>{post.job_context}</p>
            <p>{post.job_responsibilities}</p>
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Compensation & Extra Benefits
          </h1>
          <div className="space-y-3">
            <p>
              <span className="font-bold">Salary: </span>BDT {post.salary}/-
            </p>
            <p>
              <span className="font-bold">Extra Benefits: </span>
              {post.other_benefits}
            </p>
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Additional Information
          </h1>
          <div className="mt-1 sm:mt-0 sm:flex sm:flex-row justify-between">
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Employment Type:</p>
              <p className="font-bold">{post.employment_status}</p>
            </div>
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Maximum Age:</p>
              <p className="font-bold">{post.age}</p>
            </div>
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 my-3">
              <p>Job Location:</p>
              <p className="font-bold">{post.job_location}</p>
            </div>
          </div>
        </div>
        <hr />

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Company Information
          </h1>
          <div className="space-y-3">
            <p>
              <span className="font-bold">Company Name: </span>
              {post.employer.company_name}
            </p>
            <p>
              <span className="font-bold">Company Address: </span>
              {post.employer.company_address}
            </p>
            <p>
              <span className="font-bold">Business Information: </span>
              {post.employer.business_info}
            </p>
          </div>
        </div>
        <hr />

        <div className="my-10">
          <h1 className="text-2xl text-rose-800 font-bold mb-3">
            Application Instructions
          </h1>
          <p>{post.application_instructions}</p>
        </div>
        <hr />

        {/* Conditional BTN rendering */}
        <div className="flex justify-end mt-10">
          {job_seeker_id ? (
            applicationStatus === "Already applied for this job post" ? (
              <p className="bg-green-200 mx-auto text-green-800 px-3 py-1 rounded">
                You have already applied for this job post.
              </p>
            ) : isExpired ? (
              <p className="bg-red-200 mx-auto text-red-800 px-3 py-1 rounded">
                This Job Post Already Got Expired, So You Can Not Apply Now.
              </p>
            ) : (
              <button
                className="mr-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={handleOpenApplicationModal}
              >
                Apply Now
              </button>
            )
          ) : (
            <Link
              to="/login"
              className="mr-10 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Please Log in as job_seeker to apply
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Modal for applying */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-4/6 sm:w-1/2 max-w-md">
            <h2 className="text-xl mb-4">
              Apply for <span className="font-bold">{post.job_title}</span>
            </h2>

            <form id="apply-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expected Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
                />
              </div>

              {/* pdf/ doc/ docx attachment field */}
              {/* temporarily disable for vercel deployment purpose */}
              {/* <div className="mb-4">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Attachment
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-5 py-2"
                />
              </div> */}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 bg-gray-500 text-white rounded-md w-20 sm:w-32 text-sm sm:text-base"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 text-white rounded-md w-28 sm:w-32 text-sm sm:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner></LoadingSpinner> : "Submit"}
                </button>
              </div>
            </form>

            {/* showing error messages if any error occurs */}
            {errorMessage && (
              <div className="text-red-600 mb-4">{errorMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
