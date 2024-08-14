import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaRegWindowClose,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategoryFun, getProductFun } from "../../features/product/productApi";
import { TbCategory } from "react-icons/tb";
import Loader from "../../components/Loader";
import ProductImg from "../../assets/pro.webp";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageFromURL = parseInt(queryParams.get("page"), 10) || 1;
  const limitFromURL = parseInt(queryParams.get("limit"), 10) || 10;
  const searchFromURL = queryParams.get("search") || "";
  const categoryFromURL = queryParams.get("category") || "";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [limit, setLimit] = useState(limitFromURL);
  const [searchQuery, setSearchQuery] = useState(searchFromURL);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [prevData, setPrevData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", currentPage, limit, searchQuery, selectedCategory],
    queryFn: () =>
      getProductFun({ limit, currentPage, searchQuery, selectedCategory }),
    keepPreviousData: true,
    enabled: !!limit,
  });

  useEffect(() => {
    if (data) {
      setPrevData(data?.services);
    }
  }, [data]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", currentPage);
    queryParams.set("limit", limit);
    if (searchQuery) queryParams.set("search", searchQuery);
    if (selectedCategory) queryParams.set("category", selectedCategory);
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [currentPage, limit, searchQuery, selectedCategory, navigate]);

  useEffect(() => {
    const pageFromURL = parseInt(queryParams.get("page"), 10) || 1;
    const limitFromURL = parseInt(queryParams.get("limit"), 10) || 10;
    const searchFromURL = queryParams.get("search") || "";
    const categoryFromURL = queryParams.get("category") || "";

    setCurrentPage(pageFromURL);
    setLimit(limitFromURL);
    setSearchQuery(searchFromURL);
    setSelectedCategory(categoryFromURL);
  }, [location.search]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= (data?.totalPages || 1)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setDropdownOpen(false);
  };

  const handleCategoryRemove = () => {
    setSelectedCategory("");
    setCurrentPage(1);
    setDropdownOpen(false);
  };

  if (isError) return <div className="">Error fetching images.</div>;

  const {
    data: category,
    isLoading: cil,
    isError: cer,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryFun(),
    keepPreviousData: true,
    enabled: !!limit,
  });
  console.log(category);

  const handleToDetail = (data) => {
    navigate(`/product/${data?.name}`, {state: data?._id});
  };

  return (
    <div className="">
      <SEO
        title="Printing and Advertising service products - Products, Services | Etsub Printing and Advertising"
        description="Explore our range of printing products including business cards, flyers, t-shirt printing, and more. Find the perfect product for your needs at Etsub Printing and Advertising."
        keywords="business cards, flyers, t-shirt printing, printing products, advertising materials"
        hr="https://etsubprinting.onrender.com/product"
        image="/logo.png"
      />
      <ScrollToTop />
      <div className="relative">
        <div className="absolute inset-0 bg-blue-300 opacity-20"></div>
        <img
          src={ProductImg}
          alt="Product image"
          className="w-full h-[500px] max-lg:h-[400px] max-sm:h-[300px] object-cover"
        />
      </div>
      <div className="bg-slate-50 dark:bg-slate-900 max-w-[1600px] mx-auto p-4 mt-20">
        <div className="flex items-center justify-end font-semibold gap-1">
          {isLoading && !isError && (
            <div className="w-full flex justify-center">
              <Loader s={15} />
            </div>
          )}
        </div>
        <div className="flex max-lg:flex-col w-full items-start gap-4">
          <div className="bg-slate-50 max-lg: dark:bg-slate-900 text-slate-800 dark:text-slate-100 max-lg:w-full">
            <div className="flex gap-1 items-center">
              <input
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 text-sm text-slate-800 focus:outline-none dark:text-slate-100 bg-slate-100 dark:bg-slate-700"
              />
            </div>

            <div className="max-lg:hidden">
              <div className="flex gap-1 items-center font-semibold p-2 text-lg">
                <TbCategory />
                <p>Category</p>
              </div>
              <div className="flex flex-col gap-2 mt-1 text-md">
                {category?.map((c) => (
                  <div key={c} className=" relative">
                    <p
                      onClick={() => handleCategoryClick(c?.title)}
                      className={`px-4 py-1 font-semibold cursor-pointer text-sm whitespace-nowrap rounded pr-2 duration-150 hover:bg-slate-200 dark:hover:bg-slate-800 ${
                        selectedCategory === c?.title
                          ? "bg-slate-200 dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      {c?.title}
                    </p>
                    {selectedCategory === c?.title && (
                      <FaRegWindowClose
                        onClick={handleCategoryRemove}
                        className="text-red-500 absolute right-1  top-1/2 transform -translate-y-1/2 cursor-pointer"
                        title="Remove category"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:hidden p-2 text-slate-800 dark:text-slate-100 w-full">
              <div className="flex gap-1 items-center font-semibold p-2 text-lg">
                <TbCategory />
                <p>Category</p>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="ml-auto px-2 py-1 text-sm font-semibold text-blue-500 dark:text-orange-400"
                >
                  {selectedCategory ? selectedCategory : "Select Category"}
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-10">
                  <div className="flex flex-col gap-2 p-2 text-md">
                    {category?.map((c) => (
                      <div key={c} className="relative">
                        <p
                          onClick={() => handleCategoryClick(c?.title)}
                          className={`px-4 py-1 font-semibold cursor-pointer text-sm whitespace-nowrap rounded pr-8 duration-150 hover:bg-slate-200 dark:hover:bg-slate-800 ${
                            selectedCategory === c?.title
                              ? "bg-slate-200 dark:bg-slate-800"
                              : ""
                          }`}
                        >
                          {c?.title}
                        </p>
                        {selectedCategory === c?.title && (
                          <FaTimes
                            onClick={handleCategoryRemove}
                            className="text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            title="Remove category"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1  smm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {prevData?.map((image, index) => (
                <div
                  onClick={() => handleToDetail(image)}
                  key={index}
                  className="relative cursor-pointer overflow-hidden border border-slate-300 dark:border-slate-600 shadow-lg"
                >
                  <img
                    src={image.s_img}
                    alt={image.desc}
                    className={`w-full text-slate-800 dark:text-slate-100 h-64 max-md:h-80 object-cover`}
                  />
                  {image?.discount && (
                    <p className="px-4 py-1 bg-orange-500 absolute top-1 left-1 rounded text-slate-50">
                      -{image?.discount}%
                    </p>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-2 text-white">
                    <p className="text-lg text-center text-semibold">
                      {image.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 items-center mt-8">
              <div className="">
                <label
                  htmlFor="rows-per-page"
                  className="mr-2 text-slate-800 text-sm dark:text-slate-100"
                >
                  Rows per page:
                </label>
                <select
                  id="rows-per-page"
                  value={limit}
                  onChange={handleRowsPerPageChange}
                  className="p-[2px] focus:outline-none rounded bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                >
                  {[10, 20, 30, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-slate-800 dark:text-slate-100 hover:bg-slate-200 rounded-full dark:hover:bg-slate-700 duration-100 disabled:opacity-50 disabled:hover:bg-inherit"
              >
                <FaChevronLeft />
              </button>
              <span className="text-slate-800 text-[12px] dark:text-slate-100">
                Page {currentPage} of {data?.totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data?.totalPages}
                className="p-2 text-slate-800 dark:text-slate-100 hover:bg-slate-200 rounded-full dark:hover:bg-slate-700 duration-100 disabled:opacity-50 disabled:hover:bg-inherit"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
