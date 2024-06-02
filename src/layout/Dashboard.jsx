import { useState } from "react";

import logo from "../assets/logo-b.png";
import { Link, Outlet } from "react-router-dom";

import { Divide as Hamburger } from "hamburger-react";
import { BiLogOut } from "react-icons/bi";

function Dashboard() {
  const [isOpenMenu, setOpenMenu] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen);

  return (
    <div>
      <div>
        <aside
          className={
            isOpen
              ? "flex transition-all duration-300 flex-col w-64 h-screen px-4 py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700"
              : "transtion-all duration-300 -translate-x-[200px] w-0 h-0   bg-white  "
          }
        >
          <Link to={"/"}>
            <img className="  pl-9 w-[120px] pb-1 " src={logo} alt="" />
          </Link>

          <hr className="mt-4 border-gray-200 dark:border-gray-600" />

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <a
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">My Profile</span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">Add Post</span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">My Post</span>
              </a>
            </nav>

            <a href="#" className="flex items-center px-4 -mx-2">
              <BiLogOut className="w-6 h-6 text-gray-600"></BiLogOut>
              <span className="mx-2 text-base font-medium text-gray-800 dark:text-gray-200">
                Logout
              </span>
            </a>
          </div>
        </aside>
      </div>

      <div>
        <Outlet></Outlet>
      </div>
      <div className="absolute lg:hidden flex right-0 top-0 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-200 rounded-md p-0  absolute top-0 right-0  "
        >
          <Hamburger
            size={20}
            color="gray"
            toggled={isOpenMenu}
            toggle={setOpenMenu}
          />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
