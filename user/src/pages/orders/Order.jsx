import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import DataTable, { createTheme } from "react-data-table-component";
import { getOrders } from "../../features/orders/orderApi";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import SEO from "../../components/SEO";

createTheme("dark", {
  text: {
    primary: "#f1f5f9",
    secondary: "#f1f5f9",
  },
  background: {
    default: "#0f172a",
  },
  context: {
    background: "#1e293b",
    text: "#FFFFFF",
  },
  divider: {
    default: "#e2e8f0",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "#334155",
    disabled: "rgba(0,0,0,.12)",
  },
});

const Order = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const columns = [
    {
      name: "Item",
      selector: (row) => row?.service?.s_img,
      sortable: true,
      cell: (row) => (
        <img
          src={row?.service?.s_img}
          alt={row?.service?.name || "Service Image"}
          className="w-24 h-24 p-2 max-md:w-14 max-md:h-14"
        />
      ),
    },
    { name: "Item", selector: (row) => row.name, sortable: true },
    {
      name: "Category",
      selector: (row) => row?.category,
      sortable: true,
      hide: "sm",
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Total Price", selector: (row) => row.totalPrice, sortable: true },
  ];

  if (isLoading) {
    return (
      <div className="max-w-[1600px] flex justify-center mx-auto p-4 mt-20 text-slate-800 dark:text-slate-100">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-[1600px] flex justify-center mx-auto p-4 mt-20 text-slate-800 dark:text-slate-100">
        Something Went Wrong. Please Try Again.
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 mt-20">
      <SEO
        title="Order History - Etsub Printing and Advertising"
        description="View your past orders and track the status of your previous purchases at Etsub Printing and Advertising."
        keywords="order history, past orders, Etsub Printing and Advertising, track orders"
        hr="https://etsubprinting.onrender.com/order"
        image="/logo.png"
      />
      <div className="flex">
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columns}
            pagination
            data={orders}
            highlightOnHover
            responsive
            persistTableHead
            theme={theme === "dark" ? "dark" : "solarized"}
            pointerOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
