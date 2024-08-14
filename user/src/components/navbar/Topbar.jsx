import React from 'react'
import { FaTiktok, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import Switcher from '../Switcher'
const Topbar = () => {
  return (
    <div className="w-full sticky top-0 h-8 z-50 flex items-center bg-blue-500 dark:bg-orange-500">
      <div className="w-full max-w-[1600px] mx-auto text-slate-100 px-4 flex items-center justify-between">
        <div className="flex gap-1 items-center text-slate-100">
          <div>
            <IoCallSharp />
          </div>
          <a href="tel:+25160909192" className="text-slate-100 hover:underline">
            +25160909192
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <FaFacebook className="" />
          </div>
          <div>
            <FaInstagramSquare className="" />
          </div>
          <div>
            <FaTiktok className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar
