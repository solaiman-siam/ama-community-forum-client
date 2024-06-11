import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useState } from "react";
import { Select } from "flowbite-react";
import { Button } from "flowbite-react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

function AllComments() {
  const { title } = useParams();
  console.log(title);
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { data: postComment = [] } = useQuery({
    queryKey: ["specificPost-comment"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/specific-comments/${title}`);
      return data;
    },
  });

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleFeedback = (value) => {
    setFeedback(value);
  };

  console.log(postComment);

  return (
    <div>
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
              {postComment.map((comment, index) => (
                <tr
                  key={comment._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {comment.commenterEmail}
                  </th>
                  <td className="pr-6 text-left pl-8 py-4">
                    {comment.message.slice(0, 20)}
                    <button
                      onClick={open}
                      className="hover:text-blue-500 hover:underline"
                    >
                      ...Read more
                    </button>
                    {/* modal */}
                    <Transition appear show={isOpen}>
                      <Dialog
                        as="div"
                        className="relative z-10 focus:outline-none"
                        onClose={close}
                      >
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 transform-[scale(95%)]"
                              enterTo="opacity-100 transform-[scale(100%)]"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 transform-[scale(100%)]"
                              leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                              <DialogPanel className="w-full max-w-md rounded-x bg-white p-6 ">
                                <p className="mt-2 text-sm/6 text-gray-600">
                                  {comment.message}
                                </p>
                                <div className="mt-4">
                                  <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={close}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </DialogPanel>
                            </TransitionChild>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </td>
                  <td className="pl-6 pr-0 py-4 ">
                    <div className="max-w-md ">
                      <Select
                        onChange={() => handleFeedback(event.target.value)}
                        id="feedback"
                        name="feedback"
                      >
                        <option className="" value="">
                          Feedback
                        </option>
                        <option value={"hate speech"}>Hate Speech</option>
                        <option value={"sexual hasarsment"}>
                          Sexual Harasment
                        </option>
                        <option value={"vulgerity"}>Vulgurity</option>
                      </Select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      disabled={feedback === ""}
                      className="font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-500 hover:bg-opacity-100 bg-opacity-90 transition-all duration-200 bg-red-500 rounded-md px-3 py-1.5 text-white "
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {postComment.length < 1 && (
            <div>
              <h4 className="text-center my-8">No Data Available!</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllComments;
