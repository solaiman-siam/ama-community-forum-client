import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";

function Membership() {
  const membership = true;

  return (
    <div className="bg-[#F5F5FE] ">
      <Helmet>
        <title>Ama | Membership</title>
      </Helmet>
      <Banner membership={membership}></Banner>
      <div className="max-w-6xl mx-auto">
        <div className="flex  py-20">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Pro Plan
              </h2>
              <p className="text-gray-600 mb-4">
                Perfect for professionals and teams
              </p>
              <div className="text-3xl font-bold text-gray-800 mb-4">
                $19
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="text-gray-600">
                <li className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Unlimited post
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  24/7 support
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Custom analytics
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Secure data storage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
