import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployerProfileUpdate = () => {
  const [user, setUser] = useState(null);
  const [employer, setEmployer] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("user_id");
  const employerId = localStorage.getItem("employer_id");

  useEffect(() => {
    // Fetch user profile data
    fetch(`${import.meta.env.VITE_API_URL}/accounts/user/?user_id=${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch employer profile data
    fetch(
      `${import.meta.env.VITE_API_URL}/employer/by_user_id/?user_id=${userId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setEmployer(data))
      .catch((error) => console.error("Error fetching employer data:", error));
  }, [userId, token]);

  const handleUpdateEmployerProfile = (event) => {
    event.preventDefault();

    const employerProfileData = {
      company_name: event.target.company_name.value,
      company_address: event.target.company_address.value,
      business_info: event.target.business_info.value,
    };

    fetch(`${import.meta.env.VITE_API_URL}/employer/list/${employerId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(employerProfileData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Profile data successfully updated.");
        navigate("/employer_profile");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20">
        <form
          className="space-y-12"
          id="employer_profile_update_form"
          onSubmit={handleUpdateEmployerProfile}
        >
          <div
            className="border-b border-gray-900/10 pb-12"
            id="employer_profile_account_info"
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Applicant Profile
            </h2>
            {user && (
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
                      className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
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
            )}
          </div>
          <div
            className="border-b border-gray-900/10 pb-12"
            id="employer_profile_personal_info"
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Organizational Information
            </h2>
            {employer && (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="company_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={employer.company_name}
                      type="text"
                      name="company_name"
                      id="company_name"
                      autoComplete="company_name"
                      className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="company_address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company Address
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={employer.company_address}
                      type="text"
                      name="company_address"
                      id="company_address"
                      autoComplete="company_address"
                      className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="business_info"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Business Information
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={employer.business_info}
                      type="text"
                      name="business_info"
                      id="business_info"
                      autoComplete="business_info"
                      className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
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
              className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerProfileUpdate;
