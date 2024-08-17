import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import EmployerRegister from "./authentication/EmployerRegister.jsx";
import HomePage from "./pages/HomePage.jsx";
import JobSeekerRegister from "./authentication/JobSeekerRegister.jsx";
import Login from "./authentication/Login.jsx";
import JobSeekerProfile from "./pages/profiles/JobSeekerProfile.jsx";
import EmployerProfile from "./pages/profiles/EmployerProfile.jsx";
import UserProvider from "./authentication/Contexts.jsx";
import App from "./App.jsx";
import AllJobs from "./pages/jobs/AllJobs.jsx";
import JobPostDetails from "./pages/jobs/JobPostDetails.jsx";
import UpdateJobDetails from "./pages/jobs/UpdateJobDetails.jsx";
import MyApplications from "./pages/jobs/MyApplications.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import { ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import MyJobs from "./pages/jobs/MyJobs.jsx";
import JobSeekerProfileUpdate from "./pages/profiles/JobSeekerProfileUpdate.jsx";
import EmployerProfileUpdate from "./pages/profiles/EmployerProfileUpdate.jsx";
import PublishNewJob from "./pages/jobs/PublishNewJob.jsx";
import ApplicantsOfJob from "./pages/jobs/ApplicantsOfAJob.jsx";
import ScrollToTop from "./utilities/ScrollToTop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop></ScrollToTop>
        <App></App>
      </>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/employer_register",
        element: <EmployerRegister></EmployerRegister>,
      },
      {
        path: "/job_seeker_register",
        element: <JobSeekerRegister></JobSeekerRegister>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/job_seeker_profile",
        element: <JobSeekerProfile></JobSeekerProfile>,
      },
      {
        path: "/employer_profile",
        element: <EmployerProfile></EmployerProfile>,
      },
      {
        path: "/job_seeker_profile_update",
        element: <JobSeekerProfileUpdate></JobSeekerProfileUpdate>,
      },
      {
        path: "/employer_profile_update",
        element: <EmployerProfileUpdate></EmployerProfileUpdate>,
      },
      {
        path: "/all_jobs_by_category",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/job_post_details/:post_id",
        element: <JobPostDetails></JobPostDetails>,
      },
      {
        path: "/my_applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "/my_jobs",
        element: <MyJobs></MyJobs>,
      },
      {
        path: "/publish_new_job",
        element: <PublishNewJob></PublishNewJob>,
      },
      {
        path: "/update_job_details/:post_id",
        element: <UpdateJobDetails></UpdateJobDetails>,
      },
      {
        path: "/applicants_of_a_job/:post_id",
        element: <ApplicantsOfJob></ApplicantsOfJob>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </UserProvider>
  </StrictMode>
);
