import triangle from "../../assets/triangle.svg";
import cube from "../../assets/cube.svg";
import { FaSearch } from "react-icons/fa";

function Banner() {
  return (
    <div>
      <div className="bg-[url('https://i.postimg.cc/Bv96Dj11/shape.png')]  w-full h-[600px]  bg-cover bg-left">
        <div className=" flex justify-center items-center w-full flex-col h-full">
          <h1 className="text-white font-semibold text-[55px] ">
            Welcome to Ama Forum
          </h1>

          <link rel="stylesheet" href="" />

          <div className="relative p-3  rounded-full w-full max-w-[620px]">
            <input
              type="text"
              className="rounded-full w-full py-3 px-6  "
              placeholder="Search"
            />

            <button type="submit" className="absolute right-8 top-7">
              <FaSearch size={16} />
            </button>
          </div>
          <div className="flex gap-2 items-center mt-1.5">
            <h4 className="text-white">Popular: </h4>
            <span className="text-sm bg-[#484A93] rounded-full text-white px-3">
              Abcd
            </span>
            <span className="text-sm bg-[#484A93] rounded-full text-white px-3">
              Abcd
            </span>
            <span className="text-sm bg-[#484A93] rounded-full text-white px-3">
              Abcd
            </span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <img
            className="absolute top-52 opacity-50 max-w-6xl mx-auto left-5"
            src={triangle}
            alt=""
          />
        </div>
        <div>
          <img
            className="absolute right-16 top-96 opacity-50"
            src={cube}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
