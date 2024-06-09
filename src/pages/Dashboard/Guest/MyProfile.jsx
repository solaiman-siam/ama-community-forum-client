import { Helmet } from "react-helmet-async";

import useAuth from "../../../hooks/useAuth";
import bronze from "../../../assets/bronze-badge.png";
import gold from "../../../assets/gold-badge.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function MyProfile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: recentPost = [] } = useQuery({
    queryKey: ["recent-post", user?.eamil],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/recent-post/${user?.email}`);
      return data;
    },
  });

  const { data: membershipStatus = {} } = useQuery({
    queryKey: ["membership"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/membership/${user?.email}`);
      return data.membershipStatus;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Ama | My Profile</title>
      </Helmet>
      <div className="bg-white w-full relative">
        <div>
          <div className=" h-32 overflow-hidden bg-[url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')] bg-cover ">
            <div className="w-full h-full flex justify-start pl-28 items-end">
              <div className=" pb-2">
                <h2 className="font-semibold">{user?.displayName}</h2>
                <p className="text-gray-700 font-medium text-xs">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="left-5 w-20 h-20 relative -mt-16 border-4 border-[#fff] rounded-full overflow-hidden">
            <img
              className="object-cover center-center w-20 h-20"
              src={user?.photoURL}
              alt="User"
            />
          </div>

          <div className="   -mt-6 absolute left-8 ">
            {membershipStatus === "User" && (
              <>
                <img className="w-14 z-10" src={bronze} alt="" />
              </>
            )}
            {membershipStatus === "Member" && (
              <>
                <img className="w-14 z-10" src={gold} alt="" />
              </>
            )}
          </div>

          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around"></ul>
        </div>
      </div>
      <div className="bg-white">
        <div className="px-4 sm:px-0">
          <div className="hidden">
            <label htmlFor="question-tabs" className="sr-only">
              Select a tab
            </label>
            <select
              defaultValue={"recent"}
              id="question-tabs"
              className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            >
              <option>Recent</option>

              <option>Most Liked</option>

              <option>Most Answers</option>
            </select>
          </div>
          <div className=" sm:block">
            <nav
              className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
              aria-label="Tabs"
            >
              <a
                href="#"
                aria-current="page"
                className="text-gray-900 rounded-l-lg  group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10   0 hover:text-gray-700"
              >
                <span>Recent</span>
                <span
                  aria-hidden="true"
                  className="bg-[#349C83] absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </a>

              <a
                href="#"
                className="text-gray-500   group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700"
              >
                <span>Most Liked</span>
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </a>

              <a
                href="#"
                className="text-gray-500   rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700"
              >
                <span>Most Answers</span>
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <ul className="space-y-4 px-4 pt-4 min-h-[60vh] lg:px-4 bg-gray-100 py-6 ">
        {recentPost.length < 1 && (
          <div>
            <h4 className="py-4 text-center">No Post Available!</h4>
          </div>
        )}
        {recentPost.slice(0, 3).map((recent) => (
          <li
            key={recent._id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <article aria-labelledby="question-title-81614">
              <div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        {user?.displayName}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      <a href="#" className="hover:underline">
                        <time dateTime="2020-12-09T11:43:00">
                          {new Date(recent.date).toLocaleString()}
                        </time>
                      </a>
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 self-center">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                          id="options-menu-0-button"
                        >
                          <span className="sr-only">Open options</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <h2
                  id="question-title-81614"
                  className="mt-4 text-base font-medium text-gray-900"
                >
                  {recent.title}
                </h2>
              </div>
              <div className="mt-2 space-y-4 text-sm text-gray-700">
                <p>{recent.details}</p>
              </div>
              <div className="mt-6 flex justify-between space-x-8">
                <div className="flex space-x-6">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"></path>
                      </svg>
                      <span className="font-medium text-gray-900">
                        {recent.upVote}
                      </span>
                      <span className="sr-only">Vote</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-medium text-gray-900">11</span>
                      <span className="sr-only">replies</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                        <path
                          fillRule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-medium text-gray-900">
                        {recent.upVote * 25}
                      </span>
                      <span className="sr-only">views</span>
                    </button>
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
                      </svg>
                      <span className="font-medium text-gray-900">Share</span>
                    </button>
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyProfile;
