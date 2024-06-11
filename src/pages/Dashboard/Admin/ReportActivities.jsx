import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function ReportActivities() {
  const axiosSecure = useAxiosSecure();

  const { data: reportData = [], refetch } = useQuery({
    queryKey: ["report-data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/stored-feedback");
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (deletedId) => {
      const { data } = await axiosSecure.delete(
        `/delete-feedback/${deletedId}`
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Take Action Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    },
  });

  const handleDeleteComment = async (id) => {
    await mutateAsync(id);
  };

  return (
    <div>
      <Helmet>
        <title>Ama | Reported Activities</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen py-12  lg:py-6 px-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-ellipsis text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment Text
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
              {reportData.map((report, index) => (
                <tr
                  key={report._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {report.commentText}...
                  </th>
                  <td className="pr-6 text-left pl-8 py-4">
                    {report.feedback}
                  </td>
                  <td className="pl-6 pr-0 py-4 "></td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteComment(report._id)}
                      className="font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-500 hover:bg-opacity-100 bg-opacity-90 transition-all duration-200 bg-red-500 rounded-md px-3 py-1.5 text-white "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reportData.length < 1 && (
            <div>
              <h4 className="text-center my-8">No Data Available!</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportActivities;
