import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

function Main() {
  return (
    <div className="font-poppins">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
}

export default Main;
