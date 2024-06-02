import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route.jsx";
import AuthContextProvider from "./AuthProvider/AuthContextProvider.jsx";
import "flowbite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
