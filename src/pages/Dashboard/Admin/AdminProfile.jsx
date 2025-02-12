import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsPeople, BsPostcard } from "react-icons/bs";
import { MdComment } from "react-icons/md";
import { PieChart, Pie, Cell, Legend } from "recharts";
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
  // get all tags
  const { data: storedTags = [], refetch } = useQuery({
    queryKey: ["all-tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-tags");
      return data;
    },
  });

  // add tags to db
  const { mutateAsync } = useMutation({
    mutationFn: async (tags) => {
      const { data } = await axiosSecure.post("/all-tags", { tags });
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        console.log("tag addede successful");
        refetch();
      }
    },
  });

  // handle add tags
  const handleAddTags = async (e) => {
    e.preventDefault();
    const tags = e.target.tags.value;
    const convertedTags = tags.toLowerCase();
    await mutateAsync(convertedTags);
    e.target.reset();
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

        <div className="  grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-8  ">
          <div className="w-full   ">
            <div className="flex justify-center lg:justify-start items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
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
            <div className="flex justify-center lg:justify-start items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
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
            <div className="flex justify-center lg:justify-start items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
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
      <div className="bg-[#F5F5FE] px-6 lg:pt-0 md:pt-8 pt-10 md:pb-16 pb-10  lg:pb-24">
        <form onSubmit={handleAddTags}>
          <h3 className="text-3xl pb-4 text-gray-700 font-semibold ">
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
        <div className="lg:px-24 md:px-8 px-4  py-4">
          {storedTags.map((element) => (
            <p
              className="bg-gray-200 inline-flex m-1  rounded-md px-2 py-1"
              key={element._id}
            >
              #{element.tags}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
