import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../layout/Dashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ReportActivities from "../pages/Dashboard/Admin/ReportActivities";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import MyProfile from "../pages/Dashboard/Guest/MyProfile";
import AddPost from "../pages/Dashboard/Guest/AddPost";
import MyPost from "../pages/Dashboard/Guest/MyPost";
import Membership from "../pages/Membership";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/membership',
        element: <Membership></Membership>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error></Error>,
    children: [
      // admin route
      // {
      //   index: true,
      //   element: <

      // },
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/reported-activities",
        element: <ReportActivities></ReportActivities>,
      },
      {
        path: "/dashboard/make-announcement",
        element: <MakeAnnouncement></MakeAnnouncement>,
      },

      // guest/user route
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/add-post",
        element: <AddPost></AddPost>,
      },
      {
        path: "/dashboard/my-post",
        element: <MyPost></MyPost>,
      },
    ],
  },
]);
