import axios from "axios";

import cookieManager from "../utils/cookieManager";
import store from "../redux/store";
import { setGlobalError } from "../redux/slices/errorSlice";
import { navigateTo } from "../utils/navigation";
import logOutFunction from "../utils/logOutFunction";
import { EMAIL_VERIFICATION } from "../routes";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add token to all requests
API.interceptors.request.use(
  (config) => {
    const token = cookieManager("get", "JWTToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.message || "";

    if (!status) {
      store.dispatch(setGlobalError("NETWORK_ERROR"));
    } else if (status === 401) {
      await logOutFunction();
    } else if (status === 403 && msg.startsWith("Your email is not verified")) {
      navigateTo(EMAIL_VERIFICATION);
    } else if (status === 403) {
      await logOutFunction();
    } else if (status === 429) {
      store.dispatch(setGlobalError("TOO_MANY_REQUESTS"));
    } else if (status === 500) {
      store.dispatch(setGlobalError("SERVER_ERROR"));
    }

    return Promise.reject(error);
  }
);

export default API;
