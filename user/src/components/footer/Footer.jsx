import React from "react";
import Logo from '../../assets/logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t-2 mt-20 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="mx-auto w-full max-w-[1600px] p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-20 me-3" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowra dark:text-white">
                Etsub Printing and Advertising
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Pages
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="">
                  <Link to="/product" className="hover:underline">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Etsub Printing and Advertising
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
