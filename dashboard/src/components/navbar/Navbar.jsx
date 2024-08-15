import React, { useState } from "react";
import Switcher from "../Switcher";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define the menu items in an array
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Categories", path: "/categorie" },
    { name: "Products", path: "/product" },
    { name: "Create Product", path: "/product/create" },
    { name: "Customers", path: "/customer" },
  ];

  return (
    <div className="sticky top-0 right-0 z-50">
      <div className="border-b-2 border-blue-500 dark:border-orange-500">
        <div className="flex max-lg:justify-between items-center justify-end w-full p-2 py-4 bg-slate-50 dark:bg-slate-950">
          <button
            className="text-slate-800 dark:text-slate-100 lg:hidden"
            onClick={toggleSidebar}
          >
            <MdMenu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Switcher />
            <button
              className="px-2 text-slate-800 dark:text-slate-100"
              onClick={() => dispatch(logout())}
            >
              <MdLogout />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-50 dark:bg-slate-950 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Menu
          </h2>
          <button onClick={toggleSidebar}>
            <MdClose size={24} className="text-slate-900 dark:text-slate-100" />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  to={item.path}
                  className="block text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md p-2 transition-colors duration-200"
                  onClick={toggleSidebar}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
