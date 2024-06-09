import triangle from "../../assets/triangle.svg";
import cube from "../../assets/cube.svg";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

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
          membership ? "h-[80px]" : "h-[500px]"
        }   bg-cover bg-left`}
      >
        {!membership && (
          <>
            <div className=" flex justify-center items-center w-full flex-col h-full">
              <h1 className="text-white font-semibold text-[55px] ">
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
              <div className="flex gap-2 items-center mt-1.5">
                <h4 className="text-white">Popular: </h4>
                {storedTags.map((tag) => (
                  <span
                    key={tag._id}
                    className="text-sm bg-[#484A93] rounded-full text-white px-3"
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

export default Banner;
