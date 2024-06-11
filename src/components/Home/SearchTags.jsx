import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function SearchTags({ handleTagSearch }) {
  const axiosSecure = useAxiosSecure();

  const { data: storedTags = [] } = useQuery({
    queryKey: ["all-tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-tags");
      return data;
    },
  });

  return (
    <div className=" flex-col  flex lg:pt-4">
      <h4 className="text-2xl text-[#1D2746] font-semibold pb-4 md:pb-6 lg:pb-8">
        Search Tags
      </h4>
      <div className=" ">
        {storedTags.map((tag) => (
          <input
            key={tag._id}
            onClick={() => handleTagSearch(tag.tags)}
            className="px-2 py-1 focus:bg-[#078669] focus:text-white text-gray-700 my-2 mr-3 hover:text-white inline w-fit cursor-pointer transition duration-300 hover:bg-[#06BD95] rounded-md bg-gray-200 "
            type="button"
            value={`#${tag.tags}`}
            name="tags"
          />
        ))}
      </div>
    </div>
  );
}

export default SearchTags;
