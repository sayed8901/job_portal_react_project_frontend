import advice_1 from "../assets/Career-Advice-1.webp";
import advice_3 from "../assets/Career-Advice-3.webp";
import advice_4 from "../assets/Career-Advice-4.webp";

const TopCareerAdvice = () => {
  return (
    <div>
      <div className="bg-white my-16 sm:my-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 my-10">
            Top <span className="text-gradient">Career Advice</span>
          </h2>
          <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto">
            Meet countys top experts and explore the ultimate guidelines &
            advices for your professional career.
          </p>

          <div className="bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-7xl">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                Top consultants
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-16">
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={advice_1}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full img-fluid"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 font-medium text-xl text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        Jobs
                      </span>
                      <p className="mt-1 text-md text-gray-500">
                        11 awesome free career self assessments
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={advice_3}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-xl text-green-700 ring-1 ring-inset ring-green-600/20">
                        Resume
                      </span>
                      <p className="mt-1 text-md text-gray-500">
                        How to start looking for a job
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={advice_4}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-xl text-red-700 ring-1 ring-inset ring-red-600/10">
                        Interview
                      </span>
                      <p className="mt-1 text-md text-gray-500">
                        100 top interview questions - be prepared
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCareerAdvice;
