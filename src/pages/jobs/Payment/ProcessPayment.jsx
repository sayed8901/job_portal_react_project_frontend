import { useParams } from "react-router-dom";
import useTitle from "../../../utilities/useTitle";
import { useEffect, useState } from "react";

const ProcessPayment = () => {
  useTitle("Payment Processing");
  const token = localStorage.getItem("authToken");
  const { post_id } = useParams();

  const [currentJobPost, setCurrentJobPost] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    // Fetch the job post details
    fetch(`${import.meta.env.VITE_API_URL}/job_posts/all/${post_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentJobPost(data);

        // Dynamically adjust the payment amount based on job post type
        if (data.job_post_type === "standard") {
          setPaymentAmount(1000);
        } else if (data.job_post_type === "premium") {
          setPaymentAmount(2000);
        } else if (data.job_post_type === "hot_job") {
          setPaymentAmount(3000);
        }
      })
      .catch((err) => console.log(err));
  }, [post_id, token]);

  // Function to initiate payment
  const initiatePayment = () => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/job_posts/payment/initiate/?job_post_id=${post_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.gateway_url) {
          // Redirect to SSLCommerz payment interface
          window.location.href = data.gateway_url;
          //   window.open(data.gateway_url, "_blank");
        } else {
          console.error("Payment URL not returned");
        }
      })
      .catch((err) => console.log("Error initiating payment:", err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' formats as 'dd/mm/yyyy'
  };

  return (
    <div className="container mx-auto px-4 sm:px-0 py-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900">
            <span className="text-gradient">Payment Processing</span> Info
          </h2>
        </div>

        <div className="my-10">
          {currentJobPost && (
            <dl className="divide-y divide-gray-200">
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Job Post ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentJobPost.id}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Job Title
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentJobPost.job_title}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Published Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formatDate(currentJobPost.job_posted_on)}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Job Circular Type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentJobPost.job_post_type}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Service Cost
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  BDT {paymentAmount}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Payment Process Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formatDate(new Date())}
                </dd>
              </div>
            </dl>
          )}
        </div>

        {/* Initiate Payment Button */}
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={initiatePayment}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition duration-300"
          >
            Make Payment <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessPayment;
