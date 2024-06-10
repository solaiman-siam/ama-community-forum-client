import { useParams } from "react-router-dom";
import Banner from "../components/Home/Banner";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { LuArrowBigDown, LuArrowBigUp } from "react-icons/lu";
import { Tooltip } from "react-tooltip";

function PostDetails() {
  const { user } = useAuth();
  const membership = true;
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: post = {} } = useQuery({
    queryKey: ["post-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-details/${id}`);
      return data;
    },
  });

  const { data: allComments = [], refetch } = useQuery({
    queryKey: ["all-comments", post._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments/${post._id}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (commentData) => {
      const { data } = await axiosSecure.post("/add-comment", commentData);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.insertedId) {
        console.log("addd comment successful");
        refetch();
      }
    },
  });

  const handleComment = async (e) => {
    e.preventDefault();
    const message = e.target.comment.value;
    const commentData = {
      postId: post._id,
      message,
      commenterName: user?.displayName,
      commenterImage: user?.photoURL,
      commenterEmail: user?.email,
      date: new Date(),
    };
    console.log(commentData);

    await mutateAsync(commentData);
    e.target.reset();
  };

  return (
    <div className="">
      <Banner membership={membership}></Banner>

      <ul className="space-y-4 px-4 pt-4  lg:px-4 bg-gray-100 py-6 ">
        <li
          key={post._id}
          className="bg-white max-w-6xl mx-auto px-4 py-6 shadow sm:rounded-lg sm:p-6"
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
                    <a href="#" className="hover:underline">
                      {post.name}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">
                    <a href="#" className="hover:underline">
                      <time dateTime="2020-12-09T11:43:00">
                        {new Date(post.date).toLocaleString()}
                      </time>
                    </a>
                  </p>
                </div>
                <div className="flex flex-shrink-0 self-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <span className="text-xs  font-medium text-gray-700">
                        #{post.tag}
                      </span>
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
            <div className="mt-2 space-y-4 text-sm text-gray-700">
              <p>{post.details}</p>
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
                      {allComments.length}
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
      </ul>

      <div className="bg-[#F3F4F6]  pb-10">
        <div className="max-w-6xl mx-auto pb-6">
          <form onSubmit={handleComment} className="flex gap-2">
            <img
              className="rounded-full w-12 h-12"
              src={user?.photoURL}
              alt=""
            />
            <input
              className="w-7/12 border  rounded-full px-4 py-2"
              type="text"
              name="comment"
              placeholder="Add a comment"
            />
            <button
              className="px-4 text-white rounded-full font-medium text-sm py-2 bg-[#07886A] "
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
        {allComments.map((comments) => (
          <div key={comments._id} className="max-w-6xl mx-auto py-2">
            <div className="flex gap-4">
              <img
                className="rounded-full w-12 h-12"
                src={comments.commenterImage}
                alt=""
              />
              <div>
                <span className="font-medium ">{comments.commenterName}</span>
                <div>
                  <span className="text-sm text-gray-600">
                    {new Date(comments.date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className=" w-8/12 rounded-md pl-14 pt-2">
              <p className=" text-sm  bg-[#e6e6e6] px-6 py-6 text-gray-800 rounded-md">
                {comments.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
