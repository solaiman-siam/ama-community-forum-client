import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/logo-w.png";
import { IoNotifications } from "react-icons/io5";

function Navbar() {
  return (
    <div className=" w-full absolute   text-white">
      <div className="flex justify-between max-w-6xl mx-auto w-full">
        <div className="py-7 ">
          <Link to={"/"}>
            <img className="w-[85px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex items-center gap-24">
          <ul className="flex items-center gap-10">
            <li className="text-sm font-medium  group">
              <NavLink>Home</NavLink>
              <div className="bg-white h-[0.5px] w-0  group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="text-sm font-medium  group">
              <NavLink>Membership</NavLink>
              <div className="bg-white h-[0.5px] w-0  group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="text-sm font-medium  group">
              <NavLink>
                <button
                  type="button"
                  className="relative inline-flex items-center p-1 text-sm font-medium text-center text-white rounded-lg  focus:outline-none focus:ring-blue-300  dark:hover:bg-blue-700 "
                >
                  <IoNotifications size={24} />
                  <div className="absolute inline-flex items-center justify-center w-6 h- text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    20
                  </div>
                </button>
              </NavLink>
            </li>
          </ul>
          <button className="border hover:border-[#078669] duration-500 hover:bg-[#078669] transition-all border-white text-sm font-medium rounded-full px-7 py-2.5">
            Join US
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
