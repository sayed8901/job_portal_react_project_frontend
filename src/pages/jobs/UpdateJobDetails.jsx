import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../../utilities/useTitle";
import LoadingSpinner from "../../utilities/LoadingSpinner";

const UpdateJob = () => {
  useTitle("Update Job");

  const [formData, setFormData] = useState({
    job_title: "",
    job_location: "",
    vacancy: "",
    job_category: "",
    employment_status: "",
    education: "",
    experience: "",
    age: "",
    job_context: "",
    job_responsibilities: "",
    salary: "",
    other_benefits: "",
    application_instructions: "",
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { post_id } = useParams();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/job_posts/all/${post_id}/`)
      .then((response) => response.json())
      .then((post) => {
        setFormData({
          job_title: post.job_title,
          job_location: post.job_location,
          vacancy: post.vacancy,
          job_category: post.job_category,
          employment_status: post.employment_status,
          education: post.education,
          experience: post.experience,
          age: post.age,
          job_context: post.job_context,
          job_responsibilities: post.job_responsibilities,
          salary: post.salary,
          other_benefits: post.other_benefits,
          application_instructions: post.application_instructions,
          deadline: post.deadline,
        });
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Failed to fetch job details.");
      });
  }, [post_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateJobDetails = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    fetch(`${import.meta.env.VITE_API_URL}/job_posts/all/${post_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((response) => {
        setIsLoading(false);

        if (response.status === 400) {
          displayErrorMessages(response.body);
        } else {
          setSuccessMessage("Job post data successfully updated.");
          toast.success("Job post data successfully updated.");
          console.log(successMessage);
          navigate("/my_jobs");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Job update error:", err);
        setErrorMessage("An error occurred while updating the job details.");
      });
  };

  const displayErrorMessages = (errors) => {
    // "Object.values(errors)" gets all error values.
    // 'flat()' combines multiple arrays into one array of messages.
    // 'join(", ")' merges the messages into a single string, separated by commas.
    const errorMessages = Object.values(errors).flat().join(", ");
    setErrorMessage(errorMessages);
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 my-20">
      <h2 className="text-center text-3xl font-semibold leading-8 text-gray-900 pt-10">
        Update job post
      </h2>

      <form
        className="w-full md:w-5/6 lg:w-4/6 mx-auto px-5 my-10"
        onSubmit={handleUpdateJobDetails}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">
              General Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="job_title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="job_title"
                    id="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                    autoComplete="job_title"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="job_location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Location
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="job_location"
                    id="job_location"
                    value={formData.job_location}
                    onChange={handleChange}
                    required
                    autoComplete="job_location"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="vacancy"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vacancy
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="vacancy"
                    id="vacancy"
                    value={formData.vacancy}
                    onChange={handleChange}
                    required
                    autoComplete="vacancy"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="job_category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="job_category"
                    id="job_category"
                    value={formData.job_category}
                    readOnly
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="employment_status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Employment Type
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="employment_status"
                    id="employment_status"
                    value={formData.employment_status}
                    readOnly
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">
              Requirements
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="education"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Education
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-5">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Experience
                </label>
                <div className="mt-2">
                  <textarea
                    rows="2"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Max Age(yrs)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    autoComplete="age"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">
              Description
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="job_context"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Context
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="job_context"
                    id="job_context"
                    value={formData.job_context}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="job_responsibilities"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Responsibilities
                </label>
                <div className="mt-2">
                  <textarea
                    rows="10"
                    name="job_responsibilities"
                    id="job_responsibilities"
                    value={formData.job_responsibilities}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="other_benefits"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Benefits
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="other_benefits"
                    id="other_benefits"
                    value={formData.other_benefits}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Salary
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    autoComplete="salary"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="application_instructions"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Application Instructions
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="application_instructions"
                    id="application_instructions"
                    value={formData.application_instructions}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deadline
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={formData.deadline.split("T")[0]} // To match the input date format
                    onChange={handleChange}
                    required
                    autoComplete="deadline"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update or Cancel BTN */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-block px-4 py-2 font-semibold bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner></LoadingSpinner> : "Update Job"}
          </button>
        </div>
      </form>

      {/* showing error messages if any error occurs */}
      {errorMessage && (
        <p className="text-red-600 text-center font-semibold mt-5">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default UpdateJob;
