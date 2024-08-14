// components/SearchPopup.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductSearchFun } from "../../features/product/productApi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";

const SearchPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => getProductSearchFun({ searchTerm }),
    enabled: !!searchTerm, // Only fetch when searchTerm is not empty
  });

  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  const handleLink = (id) => {
    navigate(`/product/${id}`);
    onClose();
    setSearchTerm("");
    setResults([]);
  };

  const handleClose = () => {
    onClose();
    setSearchTerm("");
    setResults([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="m-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 rounded-md shadow-lg w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none shadow-md"
            />
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 text-gray-500 dark:text-gray-400"
            >
              <FaTimes size={20} />
            </button>
           {isLoading  && <div
              className="absolute top-0 right-6 text-gray-500 dark:text-gray-400"
            >
              <Loader />
            </div>}
            <div className="mt-4 overflow-y-auto max-h-[500px]">
              {searchTerm.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Search here</p>
              ) : results?.length > 0 ? (
                <ul>
                  {results.map((result) => (
                    <li
                      onClick={() => handleLink(result._id)}
                      key={result.id}
                      className="flex cursor-pointer rounded gap-4 mt-2 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <img
                        src={result?.s_img}
                        alt={result.name}
                        className="w-16 h-10 p-2"
                      />
                      <p className="block py-2 px-4 rounded-md">
                        {result.name}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;
