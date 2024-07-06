import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cookiesReducer from "./cookiesSlice";
import emailVerificationReducer from "./emailVerificationSlice";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import savesReducer from "./savesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cookies: cookiesReducer,
    emailVerification: emailVerificationReducer,
    categories: categoriesReducer,
    products: productsReducer,
    saves: savesReducer,
  },
});

export default store;
