import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./routeCheck/ProtectedRoute";
import PublicRoute from "./routeCheck/PublicRoute";
import Home from "./pages/dashboard/Home";
import Layout from "./routeCheck/Layout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/notFound/NotFound";
import ConfirmationPage from "./pages/auth/ConfirmationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import Product from "./pages/product/Product";
import SingleProduct from "./pages/product/SingleProduct";
import Payment from "./pages/payment/Payment";
import Order from "./pages/orders/Order";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/product/:productName",
          element: <SingleProduct />,
        },
        {
          path: "/payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/order",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/sign-in",
      element: (
        <PublicRoute>
          <Signin />
        </PublicRoute>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/reset/password",
      element: (
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
      ),
    },
    {
      path: "/request/reset",
      element: (
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      ),
    },
    {
      path: "/otp",
      element: (
        <PublicRoute>
          <ConfirmationPage />
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  );
};

export default App;
