import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserInfo,
  signin,
  signup,
} from "./usersThunk";
export interface InitialState {
  loading: boolean;
  token: string;
  error: string;
  signUpForm: {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    userName: string;
    address: string;
    city: string;
    country: string;
    dob?: string;
    phone: number;
    postalCode?: string; 
  };
  signInForm: {
    email: string;
    password: string;
  };
  form: {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    userName: string;
    dob: string;
    address: string;
    city: string;
    country: string;
    rolesId: string;
    phone: number;
  };
  data: any;
}
const initialState: InitialState = {
  loading: false,
  token: "",
  error: "",
  signUpForm: {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    userName: "",
    address: "",
    city: "",
    country: "",
    dob: "",  
    phone: 0,
    postalCode: "",
  },
  signInForm: {
    email: "",
    password: "",
  },
  form: {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    userName: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    rolesId: "",
    phone: 0,
  },
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setState: (
      state: InitialState,
      action: PayloadAction<{
        key: keyof InitialState;
        value: string | boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setSignUpFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["signUpForm"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.signUpForm[key] = value;
    },
    setSignInFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["signInForm"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.signInForm[key] = value;
    },
    resetState: () => {
      return { ...initialState }; // Spread the initialState to reset all fields
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(signup.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.token = actions.payload.token;
        localStorage.setItem("accessToken", actions.payload.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(actions.payload.userData)
        );
        document.cookie = `accessToken=${actions.payload.token}; path=/; secure; samesite=strict`;
      })
      .addCase(signin.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getUserInfo.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
  },
});

export const {
  setState,
  setSignUpFormState,
  setSignInFormState,
} = usersSlice.actions;

export default usersSlice.reducer;
