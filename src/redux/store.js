import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import emailVerificationReducer from "./emailVerificationSlice";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    emailVerification: emailVerificationReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export default store;
