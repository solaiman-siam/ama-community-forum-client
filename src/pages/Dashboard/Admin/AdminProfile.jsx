import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsPeople, BsPostcard } from "react-icons/bs";
import { MdComment } from "react-icons/md";

function AdminProfile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  // pie chart

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <Helmet>
        <title>Ama | Admin Profile</title>
      </Helmet>
      <div className="bg-[#F5F5FE] min-h-screen flex flex-col py-4 px-4">
        <div className="w-fit pb-4">
          <div className="flex gap-4 items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
            <div className=" rounded-full bg-opacity-75">
              <img
                className="rounded-full w-20 h-20"
                src={user?.photoURL}
                alt=""
              />
            </div>

            <div className="">
              <h4 className="text-xl font-semibold text-gray-700">
                {user?.displayName}
              </h4>
              <div className="text-gray-500 text-sm">{user?.email}</div>
            </div>
          </div>
        </div>
        <div className="  grid grid-cols-3 gap-8  ">
          <div className="w-full   ">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
              <div className="p-3 rounded-full bg-[#07886A] bg-opacity-75">
                <BsPeople size={26} color="white"></BsPeople>
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {data.users}
                </h4>
                <div className="text-gray-500">Users</div>
              </div>
            </div>
          </div>
          <div className=" w-full  ">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
              <div className="p-3 rounded-full bg-[#07886A] bg-opacity-75">
                <BsPostcard size={26} color="white" />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {data.posts}
                </h4>
                <div className="text-gray-500">Posts</div>
              </div>
            </div>
          </div>
          <div className=" w-full  ">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
              <div className="p-3 rounded-full bg-[#07886A] bg-opacity-75">
                <MdComment size={26} color="white" />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {data.comments}
                </h4>
                <div className="text-gray-500">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
