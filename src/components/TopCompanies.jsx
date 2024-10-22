import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import companyImg from "../assets/front_page-icon.jpg";

const TopCompanies = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employer/list/`)
      .then((res) => res.json())
      .then((data) => {
        setEmployers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="bg-white my-16 sm:my-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 my-10">
            Top <span className="text-gradient">Companies</span>
          </h2>
          <p className="text-center text-lg leading-8 text-gray-900 my-8 w-full sm:w-3/4 mx-auto">
            Countries top industries have been searching for best candidates for
            their organizations. Keep an eye on them for your next move..
          </p>

          {/* <!-- slider with marquee --> */}
          <Marquee
            speed={150}
            pauseOnHover={true}
            className="bg-white py-3 py-lg-4"
          >
            {employers.map((employer) => (
              <div
                key={employer.id}
                className="border rounded-tl-3xl rounded-br-3xl p-5 m-10 shadow-lg transform transition duration-300 hover:scale-110"
              >
                <img
                  src={companyImg}
                  className="img-responsive w-20 h-20 mb-2 mx-auto"
                  alt="company_img"
                />
                <p className="text-indigo-700 text-center font-bold mb-3">
                  {employer.company_name}
                </p>
                <p className="text-center">
                  Address:{" "}
                  <span className="font-bold">{employer.company_address}</span>
                </p>
                <p className="text-center">
                  Business: <span>{employer.business_info}</span>
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
