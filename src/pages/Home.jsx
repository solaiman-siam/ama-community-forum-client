import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import useRole from "../hooks/useRole";
import AllPost from "../components/Home/AllPost";

function Home() {
  const [userRole] = useRole();

  return (
    <div>
      <Helmet>
        <title>Ama | Home</title>
      </Helmet>
      <Banner></Banner>

      <AllPost></AllPost>
    </div>
  );
}

export default Home;
