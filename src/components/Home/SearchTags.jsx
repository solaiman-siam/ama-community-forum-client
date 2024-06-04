function SearchTags({ handleTagSearch }) {
  const searchTags = [
    { name: "entertainment" },
    { name: "industry" },
    { name: "conclusion" },
    { name: "news" },
    { name: "science" },
    { name: "fiction" },
    { name: "memes" },
    { name: "business" },
    { name: "game" },
    { name: "stories" },
    { name: "blog" },
    { name: "tips" },
    { name: "religios" },
    { name: "politics" },
  ];

  return (
    <div className=" flex-col  flex pt-4">
      <h4 className="text-2xl text-[#1D2746] font-semibold pb-8">
        Search Tags
      </h4>
      <div className=" ">
        {searchTags.map((tag) => (
          <input
            key={tag.name}
            onClick={() => handleTagSearch(tag.name)}
            className="px-2 py-1 focus:bg-[#078669] focus:text-white text-gray-700 my-2 mr-3 hover:text-white inline w-fit cursor-pointer transition duration-300 hover:bg-[#06BD95] rounded-md bg-gray-200 "
            type="button"
            value={`#${tag.name}`}
            name="tags"
          />
        ))}
      </div>
    </div>
  );
}

export default SearchTags;
