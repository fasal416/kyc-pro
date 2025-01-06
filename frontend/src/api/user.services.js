import axiosInstance from "./axiosInstance";

export const getUser = (id) => {
  return axiosInstance.get(`/user/${id}`);
};
