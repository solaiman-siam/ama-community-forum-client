import { HiTrendingUp } from "react-icons/hi";
import { PiSquaresFourFill } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../LoadingSpinner";
import SearchTags from "./SearchTags";
import Announcement from "./Announcement";
import { LuArrowBigDown, LuArrowBigUp } from "react-icons/lu";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
function AllPost() {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const [allPost, setAllPost] = useState([]);
  const [tag, setTag] = useState("");

  //   get all post

  const { data: alllPost = [], isLoading } = useQuery({
    queryKey: ["all-post"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/all-post");
      setAllPost(data);
      return data;
    },
  });

  const { data: data2 = [], isLoading: isLoading2 } = useQuery({
    queryKey: ["tag-search", tag],
    enabled: !!tag,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/tag-search?tag=${tag}`);
      setAllPost(data);
      return data;
    },
  });

  //   get tage search data

  const handleTagSearch = (value) => {
    setTag(value);
  };
  // load all post
  const handleAllPost = () => {
    setAllPost(alllPost);
    setTag("");
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="bg-[#F2F4F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="flex text-[#1D2746] justify-center text-[42px] font-semibold py-24">
          All Post
        </h2>
        <div className="grid grid-cols-6 gap-7 ">
          <div className="col-span-4 ">
            <div className="flex justify-between items-center">
              <h3 className="text-[42px] font-semibold text-[#1D2746]">Ama</h3>
              <button className="font-medium transition-all duration-200 px-6 py-4 hover:bg-[#06BD95] bg-[#078669] rounded-full text-white ">
                Add New Post
              </button>
            </div>
            <div className="bg-white rounded-md w-full py-3 px-6 shadow-sm my-6">
              <ul className="flex gap-2">
                <li>
                  <button
                    onClick={handleAllPost}
                    className="flex gap-1 border-b-2 border-white  focus:border-green-400 text-gray-600 transition-all duration-200  hover:bg-gray-100 px-4 py-1 items-center"
                  >
                    <PiSquaresFourFill size={20} />
                    <span>All</span>
                  </button>
                </li>
                <li>
                  <button className="flex border-b-2 border-white focus:border-green-400 gap-1 text-gray-600  transition-all duration-200  hover:bg-gray-100 px-4 py-1 items-center">
                    <HiTrendingUp size={20} /> <span>Popular</span>
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4   bg-gray-100 pb-6 pt-1 ">
                {allPost?.length < 1 && (
                  <p className="text-center font-medium text-gray-700">
                    No Post Available !
                  </p>
                )}
                {allPost.map((post) => (
                  <li
                    key={post._id}
                    className="bg-white mr-0.5 hover:mr-0 hover:shadow-2xl cursor-pointer transition-all duration-500 px-4 py-6 shadow sm:rounded-lg sm:p-6"
                  >
                    <article aria-labelledby="question-title-81614">
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={post.photoURL}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a className="hover:underline">{post.name}</a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a className="hover:underline">
                                <time dateTime="2020-12-09T11:43:00">
                                  {new Date(post.date).toLocaleString()}
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
                          {post.title}
                        </h2>
                      </div>

                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex ">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-l-full bg-gray-50 hover:bg-gray-200 text-sm">
                            <button
                              type="button"
                              className="inline-flex items-center space-x-2 text-gray-400 "
                            >
                              <LuArrowBigUp size={22} />
                              <span className=" text-sm  text-gray-600">
                                Upvote {post.upVote}
                              </span>
                            </button>
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-r-full border-l border bg-gray-50 hover:bg-gray-200 text-sm">
                            <button
                              type="button"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="DownVote"
                              className="inline-flex items-center  text-gray-400 "
                            >
                              <LuArrowBigDown size={22} />
                            </button>
                            <Tooltip id="my-tooltip" />
                          </span>
                          <span className="inline-flex pl-6 items-center text-sm">
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
                              <span className="font-medium text-gray-600">
                                11
                              </span>
                              <span className="sr-only">replies</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm"></span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <div>
                                <p className="text-xs mt-4 text-gray-600">
                                  #{post.tag}
                                </p>
                              </div>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex py-4 justify-end">
              <button className="px-3 py-1.5 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-sm  dark:bg-gray-800 dark:text-gray-200 hover:bg-[#078669] dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                </div>
              </button>

              <button className="hidden px-3 py-1.5 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-sm sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-[#078669] dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                1
              </button>

              <button className="px-3 py-1.5 mx-1 text-gray-700 transition-colors duration-300 transform rounded-sm bg-white  dark:bg-gray-800 dark:text-gray-200 hover:bg-[#078669] dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <div className="">
              <SearchTags handleTagSearch={handleTagSearch}></SearchTags>
              <Announcement></Announcement>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
