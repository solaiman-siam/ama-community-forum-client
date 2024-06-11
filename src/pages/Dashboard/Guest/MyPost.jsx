import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
function MyPost() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const { user } = useAuth();

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-post", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-post/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-post/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
      }
      refetch();
    },
  });

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>Ama | My Post</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen py-12  lg:py-6 px-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="pb-4 bg-white dark:bg-gray-900"></div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Vote
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="pr-6 pl-9 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr
                  key={post._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {post.title}
                  </th>
                  <td className="pr-6 text-left pl-8 py-4">{post.upVote}</td>
                  <td className="pr-6 pl-8 py-4 uppercase">{post.tag}</td>
                  <td className="pl-6 pr-0 py-4">
                    <Link
                      to={`/dashboard/comment/${post.title}`}
                      className="font-medium bg-[#078669] px-3 text-white py-1.5 rounded-md"
                    >
                      Comment-{post.comment}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="font-medium hover:bg-red-500 hover:bg-opacity-100 bg-opacity-90 transition-all duration-200 bg-red-500 rounded-md px-3 py-1.5 text-white "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length < 1 && (
            <div>
              <h4 className="text-center my-8">No Data Available!</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPost;
