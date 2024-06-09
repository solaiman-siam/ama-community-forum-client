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
import CommonRoute from "../pages/CommonRoute";
import PrivateRoute from "./PrivateRoute";

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
        path: "/membership",
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },
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
      {
        index: true,
        element: (
          <PrivateRoute>
            <CommonRoute></CommonRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivateRoute>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reported-activities",
        element: (
          <PrivateRoute>
            <ReportActivities></ReportActivities>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/make-announcement",
        element: (
          <PrivateRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </PrivateRoute>
        ),
      },
      // guest/user route
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-post",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-post",
        element: (
          <PrivateRoute>
            <MyPost></MyPost>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
