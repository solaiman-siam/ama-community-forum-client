import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsPeople, BsPostcard } from "react-icons/bs";
import { MdComment } from "react-icons/md";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
function AdminProfile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {} } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  // pie chart

  const data = [
    { name: "Posts", value: statistics.posts },
    { name: "Comments", value: statistics.comments },
    { name: "Users", value: statistics.users },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // add tags to db
  const { mutateAsync } = useMutation({
    mutationFn: async (tags) => {
      const { data } = await axiosSecure.post("/admin-tags", tags);
      return data;
    },
    onSuccess: () => {
      if (data.insertedId) {
        console.log("tag addede successful");
      }
    },
  });

  // handle add tags
  const handleAddTags = async (e) => {
    e.preventDefault();
    await mutateAsync(e.target.tags.value);
  };

  return (
    <div>
      <Helmet>
        <title>Ama | Admin Profile</title>
      </Helmet>
      <div className="bg-[#F5F5FE] min-h-screen flex flex-col py-4 px-4">
        <div className="w-full pb-4 ">
          <div className="flex gap-4  items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
            <div className=" rounded-full  bg-opacity-75">
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
                  {statistics.users}
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
                  {statistics.posts}
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
                  {statistics.comments}
                </h4>
                <div className="text-gray-500">Comments</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <PieChart width={600} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
      <div className="bg-[#F5F5FE] px-6  pb-24">
        <form onSubmit={handleAddTags}>
          <h3 className="text-3xl pb-4 text-gray-700 font-semibold pb-2 ">
            Add Popular Tags
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              name="tags"
              className="px-4 py-4  rounded-lg w-full "
              placeholder="Tags"
            />
            <button
              type="submit"
              className="px-6 bg-[#07886A] rounded-lg text-white font-medium text-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
