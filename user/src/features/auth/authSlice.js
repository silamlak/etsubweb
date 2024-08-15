import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "uauth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout, loginUser } = authSlice.actions;

const persistConfig = {
  key: "ua",
  storage,
};

export default persistReducer(persistConfig, authSlice.reducer);
