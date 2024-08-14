import axios from "axios";
import axiosInstance, { endpoints } from "../../api/endpoints";
import { handleError } from "../../api/handleError";

export const getFeatures = async (form) => {
  try {
    const res = await axiosInstance.get(endpoints.get_features, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};
