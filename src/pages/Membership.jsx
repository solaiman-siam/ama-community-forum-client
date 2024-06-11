import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import Payment from "../components/Payment/Payment";

function Membership() {
  const membership = true;

  return (
    <div className="bg-[#F5F5FE] ">
      <Helmet>
        <title>Ama | Membership</title>
      </Helmet>
      <Banner membership={membership}></Banner>
      <div className="max-w-6xl w-full lg:gap-24 px-4 flex lg:flex-row flex-col mx-auto">
        <div className="lg:flex lg:w-[600px] justify-center w-full  pt-8  lg:py-20">
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
        <div className="w-full py-10 lg:py-20 flex flex-col justify-center">
          <h3 className="lg:text-3xl text-2xl  font-semibold pb-4">
            Pay to get your Membership{" "}
          </h3>
          <p className="text-gray-700 pb-10">
            Holisticly harness interactive partnerships whereas virtual metrics.
            Quickly re-engineer business collaboration and idea-sharing before
            transparent action items. Conveniently embrace integrated action
            items.
          </p>
          <Payment></Payment>
        </div>
      </div>
    </div>
  );
}

export default Membership;
