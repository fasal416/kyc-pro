import axiosInstance from "./axiosInstance";

export const postUpdateKYC = (formData) => {
  return axiosInstance.post(`/kyc`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const getKYCStatus = () => {
  return axiosInstance.get(`/kyc/status`, {
    withCredentials: true,
  });
};
