import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const loginUser = ({ type = "password", ...data }) => {
  return axiosInstance.post(`/auth/login`, data, {
    params: { type },
  });
};
