import Banner from "../components/Home/Banner";
import useRole from "../hooks/useRole";

function Home() {
  const [userRole] = useRole();
  console.log(userRole);

  return (
    <div>
      <Banner></Banner>
    </div>
  );
}

export default Home;
