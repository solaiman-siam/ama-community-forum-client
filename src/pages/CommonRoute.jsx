import useRole from "../hooks/useRole";
import AdminProfile from "./Dashboard/Admin/AdminProfile";
import MyProfile from "./Dashboard/Guest/MyProfile";

function CommonRoute() {
  const [role] = useRole();

  if (role === "guest") {
    return <MyProfile></MyProfile>;
  }

  if (role === "admin") {
    return <AdminProfile></AdminProfile>;
  }
}

export default CommonRoute;
