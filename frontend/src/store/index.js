import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import kycReducer from "./kyc/reducers";
import uiReducer from "./ui/reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    kyc: kycReducer,
    ui: uiReducer,
  },
});

export default store;
