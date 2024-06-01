import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";

function Main() {
  return (
    <div className="font-roboto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default Main;
