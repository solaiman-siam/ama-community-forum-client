import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
// import useRole from "../hooks/useRole";
import AllPost from "../components/Home/AllPost";
import { useState } from "react";

function Home() {
  // const [userRole] = useRole();
  const [searchTag, setSearchTag] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTag(e.target.tagSearch.value);
  };

  return (
    <div>
      <Helmet>
        <title>Ama | Home</title>
      </Helmet>
      <Banner handleSearch={handleSearch}></Banner>
      <AllPost searchTag={searchTag}></AllPost>
    </div>
  );
}

export default Home;
