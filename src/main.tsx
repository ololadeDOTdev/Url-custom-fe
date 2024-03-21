import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.tsx'
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/Register";
import NotFound from "./pages/NotFound/NotFound";
import ContextProvider from "./context/ContextProvider";
import { MyLinks } from "./pages/Dashboard/MyLinks";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MyLinksDetails } from "./pages/Dashboard/MyLInksDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <MyLinks />,
  },
  {
    path: "/dashboard/links",
    element: <MyLinks />,
  },
  {
    path :"/dashboard/links/:id",
    element: <MyLinksDetails />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ContextProvider>
  </React.StrictMode>
);
