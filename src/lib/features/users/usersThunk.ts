import { UserApiService } from "@/services/UserApiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./usersSlice";

export const signup = createAsyncThunk(
  "user/signup",
  async (userData: InitialState["signUpForm"], { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().signUp(userData);
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const signin = createAsyncThunk(
  "user/signin",
  async (userData: InitialState["signInForm"], { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().logIn(userData);
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "users/info",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getUserIfo( {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
