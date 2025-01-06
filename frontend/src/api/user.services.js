import axiosInstance from "./axiosInstance";

export const getAuthState = (id) => {
  return axiosInstance.get(`/auth/state`);
};

export const getAllUserDetails = () => {
  return axiosInstance.get("/user");
};

export const updateKYCStatus = async (kycId, status, remarks) => {
  return await axiosInstance.patch(`/kyc/${kycId}`, {
    status,
    remarks,
  });
};
