import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../../../utilities/useTitle";
import MySingleApplication from "./MySingleApplication";

const MyApplications = () => {
  useTitle("My Applications");

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const jobSeekerId = localStorage.getItem("job_seeker_id");

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_applications/my_applications/?job_seeker_id=${jobSeekerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [jobSeekerId, token]);

  const handleWithdrawApplication = (job_application_id) => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_applications/all/${job_application_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // If response status is 204 No Content, no JSON to parse
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          return Promise.reject("Failed to withdraw application.");
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        }
        toast.success("Application successfully withdrawn.");
        setApplications(
          applications.filter((app) => app.id !== job_application_id)
        );
        navigate("/my_applications");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="bg-white py-16 sm:py-24 text-gray-900 w-full sm:w-11/12 mx-auto">
        <h2 className="text-center text-3xl font-bold leading-8 text-gray-900 my-10">
          All <span className="text-gradient">Applications</span>
        </h2>
        <p className="text-center text-lg leading-8 text-gray-900 mt-8 mb-16 w-full sm:w-3/4 mx-auto px-6 lg:px-8">
          Here are your all applied jobs. You can check out the details of your
          application from below.
        </p>

        {applications.map((application) => (
          <MySingleApplication
            key={application.id}
            application={application}
            onWithdraw={handleWithdrawApplication}
          />
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
