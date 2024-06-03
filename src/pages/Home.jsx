import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import useRole from "../hooks/useRole";

function Home() {
  const [userRole] = useRole();
  console.log(userRole);

  return (
    <div>
      <Helmet>
        <title>Ama | Home</title>
      </Helmet>
      <Banner></Banner>
    </div>
  );
}

export default Home;
