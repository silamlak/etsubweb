import axios from "axios";
import axiosInstance, { endpoints } from "../../api/endpoints";
import { handleError } from "../../api/handleError";

export const getSingleProductFun = async (id) => {
  try {
    const res = await axios.get(`${endpoints.get_product}/${id}`, {
      withCredentials: true, // Make sure cookies are sent with the request
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProductFun = async ({
  currentPage,
  limit,
  searchQuery,
  selectedCategory,
}) => {
  try {
    const res = await axios.get(
      `${endpoints.get_product}`,
      {
        params: {
          page: currentPage,
          limit: limit,
          search: searchQuery,
          category: selectedCategory,
        },
      },

      {
        withCredentials: true, // Make sure cookies are sent with the request
      }
    );
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProductSearchFun = async ({ searchTerm }) => {
  try {
    console.log(searchTerm);
    const res = await axios.get(
      `${endpoints.get_product_search}`,
      {
        params: {
          query: searchTerm,
        },
      },

      {
        withCredentials: true, // Make sure cookies are sent with the request
      }
    );
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCategoryFun = async (id) => {
  try {
    const res = await axios.get(`${endpoints.get_category}`, {
      withCredentials: true, // Make sure cookies are sent with the request
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};