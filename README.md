# BD Job Portal Project Frontend

## Project Description

**Project Name**: BD Job Portal Project

## Overview

This is the frontend for the **BD Job Portal** project, built using **React** and **Vite**. It provides the user interface for managing job listings and applications, allowing `employers` to create and manage job posts, and `job seekers` to browse, apply, and track their job applications.

The frontend is designed to interact seamlessly with the backend API, ensuring a smooth user experience for job portal management.

---

<br>

## Project Features

### User Authentication

- User roles: Employers and Job Seekers.
- Users can register for an account and log in.
- Users can log out.

### Job Listings

- Employers can create job listings by providing details such as job title, description, requirements, and location.
- Job listings contain key information, such as the job title, company name, and date posted.

### Job Details

- Users can view detailed information about a job listing, including the job description, requirements, and application instructions.
- Job seekers can apply to a job by uploading their resume and providing other information (such as salary expectations).

### User Dashboard

- Employers have a dashboard to manage their posted job listings, view applications, and update job details.
- Job seekers have a dashboard to track their applications.

### Job Categories

- Jobs can be categorized based on industries, making it easier for users to find relevant listings.

### Email Notifications

- Send email notifications to users when they successfully apply for a job or when an employer receives a new application.

---

<br>

## Instructions to Run Locally

### Prerequisites

Make sure you have the following software installed on your machine:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Vite** (already included in this project)

### Packages used:

```bash
@react-pdf/renderer==3.4.4
localforage==1.10.0
match-sorter==6.3.4
prop-types==15.8.1
react==18.3.1
react-dom==18.3.1
react-fast-marquee==1.6.5
react-lazy-load==4.0.1
react-router-dom==6.26.0
react-toastify==10.0.5
sort-by==1.2.0
xlsx==0.18.5
@vitejs/plugin-react==4.3.1
tailwindcss==3.4.10
vite==5.4.0
```

### Additional Notes:

- **Vite** is used as the development and build tool for this project.
- **React Router** is implemented for managing application routes.
- **Tailwind CSS** is used for styling components.

---

<br>

### Installation Steps:

1. Copy the `repository_url` to **Clone the repository**

   ```bash
   git clone https://github.com/sayed8901/job_portal_react_project_frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd job_portal_react_project_frontend
   ```

3. **Install the dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

   ```bash
   npm install
   code .
   ```

<br>

4. **Environment Variables Configuration**

- To run the application, you need to configure environment variables. Create a file named `.env.local` inside the root directory of your project and include the `server link` as VITE_API_URL:

* For Local server:

  ```bash
  VITE_API_URL=http://127.0.0.1:8000
  ```

* For Vercel deployed server:

  ```bash
  VITE_API_URL=https://job-portal-system-backend.vercel.app
  ```

  <br>

  - N.B.: If you have cloned the backend project (`https://github.com/sayed8901/job_portal_system_backend`) and perform the `Instructions to Run Locally` section properly, you can get the above mentioned `local server` link...

  - Or, if you don't want to set up the `backend local server`, you can use the `vercel server link` which I have already deployed earlier..

    - `Important:` **Uncomment** the relevant line depending on the server you are currently using (`Vercel deployed server` or `Local server`).

<br>

5. **Run the development server:**

After the dependencies are installed, start the development server with:

```bash
npm run dev
```

**Finally, Access the application**

The application will be available at: `http://localhost:5173`.

---

<br>

### Conclusion

Thank you for exploring the **Job Portal Project**. This project aims to streamline HR processes and enhance employee management through an user-friendly interface. I hope this application will serve as a valuable tool for HR professionals and organizations.

Feel free to contribute to this project by reporting issues, suggesting enhancements, or submitting pull requests. Your feedback is essential in making HRCorp even better. For any queries or support, feel free to reach out!
