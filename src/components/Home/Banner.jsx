import triangle from "../../assets/triangle.svg";
import cube from "../../assets/cube.svg";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import PropTypes from "prop-types";
function Banner({ membership, handleSearch }) {
  const axiosCommon = useAxiosCommon();

  const { data: storedTags = [] } = useQuery({
    queryKey: ["stored-tags"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/stored-tags");
      return data;
    },
  });

  return (
    <div className="">
      <div
        className={`bg-[url('https://i.postimg.cc/Bv96Dj11/shape.png')]  w-full ${
          membership ? "h-[80px]" : "lg:h-[500px] h-[400px]"
        }   bg-cover bg-left`}
      >
        {!membership && (
          <>
            <div className=" flex justify-center text-center items-center w-full flex-col h-full">
              <h1 className="text-white font-semibold lg:pb-2 text-4xl md:text-4xl lg:text-[55px] ">
                Welcome to Ama Forum
              </h1>

              <link rel="stylesheet" href="" />

              <form
                onSubmit={handleSearch}
                className="relative p-3  rounded-full w-full max-w-[620px]"
              >
                <input
                  type="text"
                  className="rounded-full w-full py-3 px-6  "
                  placeholder="Search"
                  name="tagSearch"
                />

                <button type="submit" className="absolute right-8 top-7">
                  <FaSearch size={16} />
                </button>
              </form>
              <div className="flex gap-2  items-center mt-1.5">
                <h4 className="text-white">Popular: </h4>
                {storedTags.map((tag) => (
                  <span
                    key={tag._id}
                    className="lg:text-sm text-xs md:text-sm  bg-[#484A93] rounded-full text-white px-1.5 md:px-2 lg:px-3"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="max-w-6xl mx-auto">
          <img
            className="absolute top-52 opacity-50 max-w-6xl mx-auto left-5"
            src={triangle}
            alt=""
          />
        </div>
        <div>
          <img
            className="absolute right-16 top-72 opacity-50"
            src={cube}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  membership: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default Banner;
