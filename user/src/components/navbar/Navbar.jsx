// components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "./megamenu"; // Corrected import path
import SearchPopup from "./SearchPopup";
import Switcher from "../Switcher";
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  const handleMouseEnter = (index) => setOpenMenu(index);
  const handleMouseLeave = () => setOpenMenu(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleMenuClick = (index, m) => {
    console.log(index, m)
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(index);
    }
  };

  const handleNavigate = (id) => {
    console.log(id)
    navigate(`${id}`)
      setActiveSubMenu(null);
    setMobileMenuOpen(false)
  }

  return (
    <div className="sticky z-50 top-8">
      <nav className="relative bg-slate-50 dark:bg-slate-900 shadow text-slate-800 dark:text-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <img
                src={Logo}
                className="w-14 h-14 max-sm:w-10 max-sm:h-10 object-contain"
              />
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex">
            <ul className="flex space-x-4 items-center">
              {menuData.map((menu, index) => (
                <li key={index} className="relative">
                  <Link
                    to={menu.link}
                    className="flex items-center py-2 px-4 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md"
                    onMouseEnter={() =>
                      menu.subcategories && handleMouseEnter(index)
                    }
                    onMouseLeave={() =>
                      menu.subcategories && handleMouseLeave()
                    }
                  >
                    {menu.name}
                    {menu.subcategories && <FaAngleDown className="ml-1" />}
                  </Link>
                  {menu.subcategories && (
                    <AnimatePresence>
                      {openMenu === index && (
                        <motion.div
                          className="absolute rounded top-full left-0  bg-slate-50 dark:bg-slate-900 shadow text-slate-800 dark:text-slate-100 mt-2 py-2 px-4 w-96 z-50"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <div className="flex space-x-4 ">
                            {menu.subcategories.map((subcategory, subIndex) => (
                              <div key={subIndex} className="w-full">
                                <h4 className="font-bold">
                                  {subcategory.title}
                                </h4>
                                <ul>
                                  {subcategory.items.map((item, itemIndex) => (
                                    <li className="w-full" key={itemIndex}>
                                      <Link
                                        to={item.link}
                                        className="flex py-1 w-full hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded"
                                      >
                                        <span>{item?.icon}</span>
                                        <p>{item?.name}</p>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Search Input */}
          <div className="relative flex gap-2 items-center">
            <Switcher />
            <button
              className="flex items-center gap-2"
              onClick={() => setSearchPopupOpen(true)}
            >
              <p>Search</p>
              <FaSearch size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 overflow-y-auto bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 z-50 md:hidden overflow-hidden"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex sticky z-40 p-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 top-0 justify-between items-center mb-4">
                <div className="text-2xl font-bold">
                  <Link to="/">
                    <img src={Logo} className="w-10 h-10 object-contain" />
                  </Link>
                </div>
                <button onClick={toggleMobileMenu}>
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="space-y-4 overflow-y-auto p-4">
                {menuData.map((menu, index) => (
                  <div key={index}>
                    <button className="w-full z-40 text-left py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-between">
                      <Link
                        to={menu.link}
                        onClick={() => handleNavigate(menu.link)}
                        className="w-full"
                      >
                        {menu.name}
                      </Link>
                      {menu.subcategories && (
                        <FaAngleDown
                          onClick={() => handleMenuClick(index, menu.link)}
                          className={`transition-transform duration-300 ${
                            activeSubMenu === index ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )}
                    </button>
                    {menu.subcategories && (
                      <AnimatePresence>
                        {activeSubMenu === index && (
                          <motion.div
                            className="mt-2 ml-4 space-y-2 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {menu.subcategories.map((subcategory, subIndex) => (
                              <div key={subIndex} className="z-10">
                                <h4 className="font-bold">
                                  {subcategory.title}
                                </h4>
                                <ul>
                                  {subcategory.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link
                                        onClick={() =>
                                          handleNavigate(menu.link)
                                        }
                                        to={item.link}
                                        className="block py-1 hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Popup */}
        <SearchPopup
          isOpen={searchPopupOpen}
          onClose={() => setSearchPopupOpen(false)}
        />
      </nav>
    </div>
  );
};

export default Navbar;
