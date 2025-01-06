import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "../../api/auth.services";

export const login = createAsyncThunk(
  "auth/login",
  async (cred, { rejectWithValue }) => {
    try {
      const { data } = await loginUser(cred);
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (details, { rejectWithValue }) => {
    try {
      const { data } = await registerUser(details);
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
