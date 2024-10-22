import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../../utilities/useTitle";

const EmployerProfile = () => {
  useTitle("Employer Profile");

  const [accountInfo, setAccountInfo] = useState({});
  const [organizationalInfo, setOrganizationalInfo] = useState({});
  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/accounts/user/?user_id=${user_id}`
        );
        const user = await response.json();
        setAccountInfo(user);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    const fetchOrganizationalInfo = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/employer/by_user_id/?user_id=${user_id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const user = await response.json();
        setOrganizationalInfo(user);
        localStorage.setItem("employer_id", user.id);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    fetchAccountInfo();
    fetchOrganizationalInfo();
  }, [token, user_id]);

  return (
    <div className="container mx-auto px-2 sm:px-0 py-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900">
            <span className="text-gradient">Employer</span> Information
          </h2>
          <p className="pt-10 max-w-2xl text-base sm:text-lg md:text-xl font-semibold leading-6 text-center text-gray-900">
            Account details
          </p>
        </div>

        <div className="mt-6 border-t border-gray-200">
          {accountInfo && (
            <dl className="divide-y divide-gray-200">
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {accountInfo.first_name} {accountInfo.last_name}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Username
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {accountInfo.username}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {accountInfo.email}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="px-4 sm:px-0">
          <p className="pt-10 max-w-2xl text-base sm:text-lg md:text-xl font-semibold leading-6 text-center text-gray-900">
            Organization Info
          </p>
        </div>

        {organizationalInfo && (
          <div className="mt-6 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Company name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {organizationalInfo.company_name}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Company Address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {organizationalInfo.company_address}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business info
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {organizationalInfo.business_info}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Update Profile BTN part */}
        <div className="flex justify-between items-center my-12 gap-3">
          <button
            onClick={() => navigate("/my_jobs")}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            View My Job Posts
          </button>
          <button
            onClick={() => navigate("/employer_profile_update")}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Update profile data <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
