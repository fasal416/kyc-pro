import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const loginUser = (cred) => {
  return axiosInstance.post(`/auth/login`, cred);
};

export const clearCookie = () => {
  return axiosInstance.post(`/auth/logout`);
};
