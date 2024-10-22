import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../../utilities/useTitle";

const JobSeekerProfileUpdate = () => {
  useTitle("Update JobSeeker");

  const [user, setUser] = useState(null);
  const [jobSeeker, setJobSeeker] = useState({
    fathers_name: "",
    mothers_name: "",
    contact_no: "",
    age: "",
    address: "",
    education: "",
    experience: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    // Fetch user profile data
    fetch(`${import.meta.env.VITE_API_URL}/accounts/user/?user_id=${user_id}`)
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch employer profile data
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_seeker/by_user_id/?user_id=${user_id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setJobSeeker(data))
      .catch((error) => console.error("Error fetching job_seeker data:", error));
  }, [user_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobSeeker((JobSeekerData) => ({
      ...JobSeekerData,
      [name]: value,
    }));
  };

  const handleUpdateJobSeekerProfile = (event) => {
    event.preventDefault();

    const job_seeker_id = localStorage.getItem("job_seeker_id");
    const token = localStorage.getItem("authToken");

    const jobSeekerProfileData = {
      sex: jobSeeker.sex,
      age: parseInt(jobSeeker.age),
      contact_no: jobSeeker.contact_no,
      address: jobSeeker.address,
      fathers_name: jobSeeker.fathers_name,
      mothers_name: jobSeeker.mothers_name,
      education: jobSeeker.education,
      experience: jobSeeker.experience,
    };

    fetch(`${import.meta.env.VITE_API_URL}/job_seeker/list/${job_seeker_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(jobSeekerProfileData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Profile data successfully updated.");
        navigate("/job_seeker_profile");
      })
      .catch((err) => console.log("job seeker update profile error:", err));
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 py-10">
      {/* Profile data */}
      <form
        className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20"
        id="job_seeker_profile_update_form"
        onSubmit={handleUpdateJobSeekerProfile}
      >
        <div className="space-y-12">
          <div
            className="border-b border-gray-900/10 pb-12"
            id="applicant_profile_account_info"
          >
            <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900">
              Update <span className="text-gradient">Applicant Profile</span>
            </h2>

            {user && (
              <div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        readOnly
                        value={user.username}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        readOnly
                        value={user.first_name}
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="first_name"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        readOnly
                        value={user.last_name}
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="last_name"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        readOnly
                        value={user.email}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="border-b border-gray-900/10 pb-12"
            id="applicant_profile_personal_info"
          >
            <h2 className="max-w-2xl text-base sm:text-lg md:text-xl font-semibold leading-6 text-gray-900">
              Personal Information
            </h2>

            {jobSeeker && (
              <div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="fathers_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Fathers name
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.fathers_name}
                        onChange={handleChange}
                        type="text"
                        name="fathers_name"
                        id="fathers_name"
                        autoComplete="fathers_name"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mothers_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mothers name
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.mothers_name}
                        onChange={handleChange}
                        type="text"
                        name="mothers_name"
                        id="mothers_name"
                        autoComplete="mothers_name"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="contact_no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact number
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.contact_no}
                        onChange={handleChange}
                        type="text"
                        name="contact_no"
                        id="contact_no"
                        autoComplete="contact_no"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Age
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.age}
                        onChange={handleChange}
                        type="number"
                        name="age"
                        id="age"
                        autoComplete="age"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.address}
                        onChange={handleChange}
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="education"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Education
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.education}
                        onChange={handleChange}
                        type="text"
                        name="education"
                        id="education"
                        autoComplete="education"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Experience
                    </label>
                    <div className="mt-2">
                      <input
                        value={jobSeeker.experience}
                        onChange={handleChange}
                        type="text"
                        name="experience"
                        id="experience"
                        autoComplete="experience"
                        className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Update BTN part */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="update_job_seeker_profile"
            className="rounded-md bg-indigo-600 py-2 px-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerProfileUpdate;
