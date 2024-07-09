import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import cookiesReducer from "./cookiesSlice";
import emailVerificationReducer from "./emailVerificationSlice";
import { savesReducer, fetchSavesReducer } from "./savesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,

    auth: authReducer,
    cookies: cookiesReducer,
    emailVerification: emailVerificationReducer,

    saves: savesReducer,
    fetchSaves: fetchSavesReducer,
  },
});

export default store;
