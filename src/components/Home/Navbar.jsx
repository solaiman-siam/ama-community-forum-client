import logo from "../../../public/logo-w.png";

function Navbar() {
  return (
    <div className=" max-w-6xl mx-auto ">
      <div className="py-8 absolute">
        <img className="w-[85px]" src={logo} alt="" />
      </div>
    </div>
  );
}

export default Navbar;
