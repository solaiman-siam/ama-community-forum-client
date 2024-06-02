import { useState } from "react";

import logo from "../assets/logo-b.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { Divide as Hamburger } from "hamburger-react";
import { BiLogOut } from "react-icons/bi";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { MdAddCircleOutline } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbMessageReport } from "react-icons/tb";
import { PiUsersBold } from "react-icons/pi";
import { GrAnnounce } from "react-icons/gr";

function Dashboard() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpenMenu, setOpenMenu] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [role, userLoading] = useRole();

  // logout user
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  if (userLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="font-poppins flex ">
      <div>
        <aside
          className={
            isOpen
              ? "flex transition-all duration-300 flex-col w-[280px] h-screen px-4 py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700"
              : "transtion-all duration-300 -translate-x-[400px] w-[280px] h-screen   bg-white  "
          }
        >
          <Link to={"/"}>
            <img className="  pl-9 w-[120px] pb-1 " src={logo} alt="" />
          </Link>

          <hr className="mt-4 border-gray-200 dark:border-gray-600" />

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {role === "guest" && (
                <>
                  <NavLink
                    to={"/dashboard/my-profile"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
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
                  </NavLink>

                  <NavLink
                    to={"/dashboard/add-post"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <MdAddCircleOutline className="w-6 h-6 text-gray-600" />

                    <span className="mx-4 font-medium">Add Post</span>
                  </NavLink>

                  <NavLink
                    to={"/dashboard/my-post"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <BsPostcard className="w-6 h-6 text-gray-600" />

                    <span className="mx-4 font-medium">My Post</span>
                  </NavLink>
                </>
              )}
              {role === "admin" && (
                <>
                  <NavLink
                    to={"/dashboard/admin-profile"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <CgProfile className="w-6 h-6 text-gray-600" />

                    <span className="mx-4 font-medium">Admin Profile</span>
                  </NavLink>

                  <NavLink
                    to={"/dashboard/manage-users"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <PiUsersBold className="w-6 h-6 text-gray-600" />

                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>

                  <NavLink
                    to={"/dashboard/reported-activities"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <TbMessageReport className="w-6 h-6 text-gray-600" />
                    <span className="mx-4 font-medium">
                      Reported Activities
                    </span>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/make-announcement"}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 mt-5 text-gray-600 bg-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                  >
                    <GrAnnounce className="w-6 h-6 text-gray-600" />

                    <span className="mx-4 font-medium">Make Announcement</span>
                  </NavLink>
                </>
              )}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 -mx-2"
            >
              <BiLogOut className="w-6 h-6 text-gray-600"></BiLogOut>
              <span className="mx-2 cursor-pointer text-base font-medium text-gray-800 dark:text-gray-200">
                Logout
              </span>
            </button>
          </div>
        </aside>
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
      <div className="w-full bg-gray-400 flex-1 h-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;
