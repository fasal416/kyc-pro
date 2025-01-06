import axiosInstance from "./axiosInstance";

export const getAuthState = (id) => {
  return axiosInstance.get(`/auth/state`);
};
