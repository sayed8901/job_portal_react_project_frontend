import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import useTitle from "../../utilities/useTitle";

const PublishNewJob = () => {
  useTitle("Publish Job");

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    job_category: [],
    job_post_type: "",
    job_title: "",
    vacancy: "",
    job_location: "",
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

  const token = localStorage.getItem("authToken");
  const employer_id = localStorage.getItem("employer_id");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/category/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, options, type } = e.target;

    // job_category is handled as an array as it might be multiple, so sent as a list to backend
    if (type === "select-multiple") {
      // Convert the options collection to an array
      const optionsArray = Array.from(options);

      // Filter out the options that are selected only
      const selectedOptionsArray = optionsArray.filter(
        (option) => option.selected
      );

      // Map over the selected options and convert each value to an integer
      const selectedOptions = selectedOptionsArray.map((option) =>
        parseInt(option.value)
      );

      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleJobPublish = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const jobPublishData = {
      ...formData,

      // job_category is handled as an array as it might be multiple, so sent as a list to backend
      // also converting it into a integer number as primary key for the job category
      job_category: formData.job_category.map((catId) => parseInt(catId)),

      // converting into integer number
      vacancy: parseInt(formData.vacancy),
      age: parseInt(formData.age),
      salary: parseInt(formData.salary),
    };

    console.log(jobPublishData);

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_posts/publish/?employer_id=${employer_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(jobPublishData),
      }
    )
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
          setSuccessMessage("Job published successfully.");
          toast.success("Job published successfully.");
          console.log(successMessage);
          navigate("/my_jobs");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Job publish error:", err);
        setErrorMessage("An error occurred while publishing the job.");
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
      <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 pt-10">
        <span className="text-gradient">Publish</span> a new job
      </h2>

      <form
        className="w-full md:w-5/6 lg:w-4/6 mx-auto px-5 my-10"
        onSubmit={handleJobPublish}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">
              General Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
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
                    required
                    value={formData.job_title}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="job_post_type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Post Circular Type
                </label>
                <div className="mt-2">
                  <select
                    id="job_post_type"
                    name="job_post_type"
                    required
                    value={formData.job_post_type}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Job Post Type
                    </option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="hot_job">Hot Job</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="job_category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Category (multiples can be selected)
                </label>
                <div className="mt-2">
                  <select
                    id="job_category"
                    name="job_category"
                    multiple
                    required
                    value={formData.job_category}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                    required
                    value={formData.vacancy}
                    onChange={handleChange}
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
                    required
                    value={formData.job_location}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="employment_status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Employment Status
                </label>
                <div className="mt-2">
                  <select
                    id="employment_status"
                    name="employment_status"
                    required
                    value={formData.employment_status}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Employment Status
                    </option>
                    <option value="permanent">Permanent</option>
                    <option value="contractual">Contractual</option>
                    <option value="part-time">Part-time</option>
                    <option value="full-time">Full-time</option>
                  </select>
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
                  className="block text-sm font-medium leading-6 text-gray-900 bg-white"
                >
                  Education
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="education"
                    id="education"
                    required
                    value={formData.education}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Experience
                </label>
                <div className="mt-2">
                  <textarea
                    rows="3"
                    name="experience"
                    id="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">
              Job Details
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
                    required
                    value={formData.job_context}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
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
                    required
                    value={formData.job_responsibilities}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4">
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
                    required
                    value={formData.other_benefits}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
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
                    type="number"
                    name="salary"
                    id="salary"
                    required
                    value={formData.salary}
                    onChange={handleChange}
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
                    required
                    value={formData.application_instructions}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
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
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publish BTN */}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner></LoadingSpinner> : "Publish Now"}
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

export default PublishNewJob;
