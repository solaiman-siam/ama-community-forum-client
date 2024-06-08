import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);

  const { data: manageUsers = [], refetch } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/manage-users`);
      setUsers(data);
      return data;
    },
  });

  const { mutateAsync, data } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.post(`/make-admin/${id}`);
      return data;
    },
    onSuccess: () => {
      console.log(data);
      Swal.fire({
        title: "Make Admin!",
        text: "Role Updated Successfully",
        icon: "success",
      });
      refetch();
    },
  });

  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0E9F6E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  const { data: searchUser = [] } = useQuery({
    queryKey: ["search-user", keyword],
    queryFn: async () => {
      const { data } = await axiosSecure(`/search-users?keyword=${keyword}`);
      setUsers(data);
      return data;
    },
  });

  console.log(searchUser);

  const handleUserSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.userName.value);
  };

  return (
    <div>
      <Helmet>
        <title>Ama | Manage Users</title>
      </Helmet>
      <div className="bg-[#F3F4F6] pt-6">
        <form
          onSubmit={handleUserSearch}
          className="relative w-full max-w-xl mx-auto bg-white rounded-full"
        >
          <input
            placeholder="Search Users"
            className="rounded-full w-full h-12 bg-transparent py-2 pl-8 pr-32 border-white "
            type="text"
            name="userName"
          />
          <button
            type="submit"
            className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-1 bg-[#0E9F6E] sm:px-6 sm:text-base sm:font-medium hover:bg-[#0e9f6fd9] focus:outline-none   "
          >
            <svg
              className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </form>
        <div className="bg-gray-100 min-h-screen pb-12  lg:py-6 px-6">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900"></div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="pr-6 pl-9 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="pr-6 text-left pl-8 py-4">{user.email}</td>
                    <td className="pr-6 pl-8 py-4 ">{user.membershipStatus}</td>
                    <td className="px-6 py-4">
                      {user.role === "guest" && (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="font-medium hover:bg-green-500 hover:bg-opacity-100 bg-opacity-90 transition-all duration-200 bg-green-500 rounded-md px-3 py-1.5 text-white "
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role === "admin" && (
                        <button className="font-medium hover:bg-green-500 hover:bg-opacity-100 bg-opacity-90 transition-all duration-200 bg-green-500 rounded-md px-3 py-1.5 text-white ">
                          Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length < 1 && (
              <div>
                <h4 className="text-center my-8">No Data Available!</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
