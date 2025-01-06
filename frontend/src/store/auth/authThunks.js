import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "../../api/auth.services";
import { getAuthState } from "../../api/user.services";

export const login = createAsyncThunk(
  "auth/login",
  async (cred, { rejectWithValue }) => {
    try {
      const { data } = await loginUser(cred);
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
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAuthState();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to check authentication state"
      );
    }
  }
);
