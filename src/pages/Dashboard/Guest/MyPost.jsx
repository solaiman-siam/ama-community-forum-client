import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { Link } from "react-router-dom";
function MyPost() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Ama | My Post</title>
      </Helmet>
      <div className="bg-white py-6">
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">1</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pr
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  <Link
                    to={""}
                    className="font-medium text-blue-600 dark:text-blue-500 "
                  >
                    Comment
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={""}
                    className="font-medium text-blue-600 dark:text-blue-500 "
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyPost;
