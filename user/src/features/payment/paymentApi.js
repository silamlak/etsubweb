import axios from "axios";
import axiosInstance, { endpoints } from "../../api/endpoints";
import { handleError } from "../../api/handleError";

export const order = async (form) => {
  try {
    console.log(form)
    const res = await axiosInstance.post(`${endpoints.post_purchase}`,{form}, {
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
