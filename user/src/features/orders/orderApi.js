import axios from "axios";
import axiosInstance, { endpoints } from "../../api/endpoints";
import { handleError } from "../../api/handleError";

export const getOrders = async (form) => {
  try {
    console.log(form);
    const res = await axiosInstance.get(
      `${endpoints.get_orders}`,
      { },
      {
        withCredentials: true, // Make sure cookies are sent with the request
      }
    );
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};
