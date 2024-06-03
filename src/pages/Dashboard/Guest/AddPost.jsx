import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import useAuth from "../../../hooks/useAuth";
function AddPost() {
  const { user } = useAuth();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [isClearable, setIsClearable] = useState(true);

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const tags = form.tags.value;
    const details = form.details.value;
    console.log(title, tags, details);
  };

  return (
    <div className="">
      <Helmet>
        <title>Ama | Add Post</title>
      </Helmet>
      <div className="bg-white  py-10">
        <div className="heading text-center pb-5 font-bold text-2xl  text-gray-800">
          New Post
        </div>

        <form
          onSubmit={handleAddPost}
          className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 my-4 rounded-full "
              src={user?.photoURL}
              alt=""
            />
            <div>
              <h4 className="font-medium ">{user?.displayName}</h4>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
          <input
            className="title rounded-md  border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            name="title"
          />
          <Select
            isClearable={isClearable}
            className=" border-gray-300 rounded-md  mb-4 outline-none"
            options={options}
            name="tags"
          />
          <textarea
            className="description rounded-md  sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            name="details"
            placeholder="Describe everything about this post here"
          ></textarea>

          {/* <!-- icons --> */}
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>
          {/* <!-- buttons --> */}
          <div className="buttons flex justify-end">
            <button
              type="submit"
              className="btn rounded-md border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-white hover:bg-[#078668d9] duration-200 transition-all ml-2 bg-[#078669]"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
