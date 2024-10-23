const Contact = () => {
  return (
    <div className="my-16 sm:my-24 mx-6 text-gray-900" name="contact">
      <div className="sm:w-3/4 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mt-16">
          <span className="text-gradient">Contact</span> Us
        </h2>
        <p className="py-12 text-center">
          Have any questions or facing issues with your account or job search?
          We are here to help! Feel free to reach out for support or provide
          feedback to help us improve.
        </p>
      </div>

      <div className="flex justify-center items-center">
        <form
          action="https://getform.io/f/0a752fea-d8cb-41e8-a843-de8d9ff61844"
          method="POST"
          className="flex flex-col w-full max-w-lg mx-auto text-center"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Your Name"
            className="px-4 py-2 bg-transparent border-2 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-600 transition duration-300"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter Your Email"
            className="my-4 px-4 py-2 bg-transparent border-2 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-600 transition duration-300"
          />
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Describe your issue or share your feedback"
            className="px-4 py-2 bg-transparent border-2 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-600 transition duration-300"
          ></textarea>

          <div className="flex mx-auto my-8">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:bg-indigo-700 shadow-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
