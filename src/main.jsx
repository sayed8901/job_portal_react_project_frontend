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
import AllJobs from "./pages/jobs/AllJobs/AllJobs.jsx";
import JobPostDetails from "./pages/jobs/JobPostDetails.jsx";
import UpdateJobDetails from "./pages/jobs/UpdateJobDetails.jsx";
import MyApplications from "./pages/jobs/MyApplications/MyApplications.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import { ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import MyJobs from "./pages/jobs/MyJobs/MyJobs.jsx";
import JobSeekerProfileUpdate from "./pages/profiles/JobSeekerProfileUpdate.jsx";
import EmployerProfileUpdate from "./pages/profiles/EmployerProfileUpdate.jsx";
import PublishNewJob from "./pages/jobs/PublishNewJob.jsx";
import ApplicantsOfJob from "./pages/jobs/ApplicantsOfAJob.jsx";
import ScrollToTop from "./utilities/ScrollToTop.jsx";
import LazyLoad from "react-lazy-load";
import Contact from "./components/Contact.jsx";
import ProcessPayment from "./pages/jobs/Payment/ProcessPayment.jsx";
import PaymentSuccessInfo from "./pages/jobs/Payment/PaymentSuccessInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop></ScrollToTop>
        <App></App>
      </>
    ),
    errorElement: (
      <LazyLoad>
        <ErrorPage></ErrorPage>
      </LazyLoad>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/employer_register",
        element: (
          <LazyLoad>
            <EmployerRegister></EmployerRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/job_seeker_register",
        element: (
          <LazyLoad>
            <JobSeekerRegister></JobSeekerRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/login",
        element: (
          <LazyLoad>
            <Login></Login>
          </LazyLoad>
        ),
      },
      {
        path: "/job_seeker_profile",
        element: (
          <LazyLoad>
            <JobSeekerProfile></JobSeekerProfile>
          </LazyLoad>
        ),
      },
      {
        path: "/employer_profile",
        element: (
          <LazyLoad>
            <EmployerProfile></EmployerProfile>
          </LazyLoad>
        ),
      },
      {
        path: "/job_seeker_profile_update",
        element: (
          <LazyLoad>
            <JobSeekerProfileUpdate></JobSeekerProfileUpdate>
          </LazyLoad>
        ),
      },
      {
        path: "/employer_profile_update",
        element: (
          <LazyLoad>
            <EmployerProfileUpdate></EmployerProfileUpdate>
          </LazyLoad>
        ),
      },

      {
        path: "/all_jobs_by_category",
        element: (
          <LazyLoad>
            <AllJobs></AllJobs>
          </LazyLoad>
        ),
      },
      {
        path: "/job_post_details/:post_id",
        element: (
          <LazyLoad>
            <JobPostDetails></JobPostDetails>
          </LazyLoad>
        ),
      },
      {
        path: "/my_applications",
        element: (
          <LazyLoad>
            <MyApplications></MyApplications>
          </LazyLoad>
        ),
      },
      {
        path: "/my_jobs",
        element: (
          <LazyLoad>
            <MyJobs></MyJobs>
          </LazyLoad>
        ),
      },
      {
        path: "/publish_new_job",
        element: (
          <LazyLoad>
            <PublishNewJob></PublishNewJob>
          </LazyLoad>
        ),
      },
      {
        path: "/update_job_details/:post_id",
        element: (
          <LazyLoad>
            <UpdateJobDetails></UpdateJobDetails>
          </LazyLoad>
        ),
      },
      {
        path: "/applicants_of_a_job/:post_id",
        element: (
          <LazyLoad>
            <ApplicantsOfJob></ApplicantsOfJob>
          </LazyLoad>
        ),
      },

      {
        path: "/payment/process/:post_id",
        element: (
          <LazyLoad>
            <ProcessPayment></ProcessPayment>
          </LazyLoad>
        ),
      },
      {
        path: "/payment/success/:post_id",
        element: (
          <LazyLoad>
            <PaymentSuccessInfo></PaymentSuccessInfo>
          </LazyLoad>
        ),
      },

      {
        path: "/contact",
        element: (
          <LazyLoad>
            <Contact></Contact>
          </LazyLoad>
        ),
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
