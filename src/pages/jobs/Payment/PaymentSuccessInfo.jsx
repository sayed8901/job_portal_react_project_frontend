import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTitle from "../../../utilities/useTitle";

const PaymentSuccessInfo = () => {
  useTitle("Payment Successful");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { post_id } = useParams();

  const [currentJobPost, setCurrentJobPost] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

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
      .then((data) => setCurrentJobPost(data))
      .catch((err) => console.log("Error fetching job post details:", err));

    // Fetch the payment details
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/payment/by_job_post_id/?job_post_id=${post_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPaymentInfo(data);
      })
      .catch((err) => console.log("Error fetching payment details:", err));
  }, [post_id, token]);

  return (
    <div className="container mx-auto px-4 sm:px-0 py-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20">
        <div className="px-4 sm:px-0 text-center">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900">
            <span className="text-gradient">Payment</span> Successful!
          </h2>

          <p className="text-lg text-gray-700 my-12">
            Your payment for the job post has been successfully processed.
          </p>
        </div>

        {currentJobPost && (
          <div className="my-10">
            <h2 className="text-center text-xl font-semibold text-gray-900 mb-4">
              Job Details
            </h2>
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
                  Title
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentJobPost.job_title}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currentJobPost.job_post_type}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {paymentInfo && (
          <div className="my-10">
            <h2 className="text-center text-xl font-semibold text-gray-900 mb-4">
              Payment Details
            </h2>
            <dl className="divide-y divide-gray-200">
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Transaction ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.tran_id}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Validation ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.val_id}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Amount
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.amount} {paymentInfo.currency}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Payment Method
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.card_type}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Card Brand
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.card_brand}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Bank Transaction ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {paymentInfo.bank_tran_id}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Transaction Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {new Date(paymentInfo.tran_date).toLocaleDateString("en-GB")}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="flex justify-around gap-4">
          <button
            onClick={() => navigate("/all_jobs_by_category")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
          >
            View All Job Posts
          </button>
          <button
            onClick={() => navigate("/my_jobs")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            View My Job Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessInfo;
