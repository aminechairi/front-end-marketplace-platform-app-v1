import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setNavigate } from "./utils/navigation";
import { clearGlobalError } from "./redux/slices/errorSlice";

import NavBar from "./components/navBar/navBar";
import WentWrong from "./components/wentWrong/wentWrong";
import Footer from "./components/footer/footer";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import HomePage from "./pages/homePage";
import Search from "./pages/search/search";
import Product from "./pages/product/product";

import LogIn from "./pages/logIn/logIn";
import SignUp from "./pages/signUp/signUp";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";

import EmailVerification from "./pages/emailVerification/emailVerification";
import AddPhoneNumber from "./pages/addPhoneNumber/addPhoneNumber";
import Profile from "./pages/profile/profile";
import Favorites from "./pages/favorites/favorites";
import ShoppingCart from "./pages/shoppingCart/shoppingCart";
import Orders from "./pages/orders/orders";
import NoFound from "./pages/noFound/noFound";

import {
  HOME,
  SEARCH,
  SEARCH_VALUE,
  PRODUCT,
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
  EMAIL_VERIFICATION,
  ADD_PHONE_NUMBER,
  PROFILE,
  FAVORITES,
  SHOPPING_CART,
  ORDERS,
  NO_FOUND,
} from "./routes";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);
  const { type } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  const handleDismiss = () => {
    dispatch(clearGlobalError());
  };

  if (type === "NETWORK_ERROR") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("./imgs/network-error.png")}
          title="Network Error"
          paragraph="We’re having trouble connecting to the server.\nPlease check your internet connection and try again."
          buttonContent="TRY AGAIN"
          onClick={handleDismiss}
        />
        <Footer />
      </>
    );
  }

  if (type === "SERVER_ERROR") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("./imgs/server-error.png")}
          title="Server Error"
          paragraph="Something went wrong on our end.\nWe're working to fix it. Please try again later."
          buttonContent="TRY AGAIN LATER"
          onClick={handleDismiss}
        />
        <Footer />
      </>
    );
  }

  if (type === "TOO_MANY_REQUESTS") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("./imgs/too many requests.png")}
          title="Oops! Too many requests. Please try again later."
          paragraph="It seems like you have made too many requests in a short period of time.\nPlease wait a moment before trying again."
          buttonContent="TRY AGAIN LATER"
          onClick={handleDismiss}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeMode}
      />
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={SEARCH} element={<Search />} />
        <Route path={SEARCH_VALUE} element={<Search />} />
        <Route path={PRODUCT} element={<Product />} />

        <Route
          path={LOGIN}
          element={
            <ProtectedRoute isProtected={false} redirectTo={HOME}>
              <LogIn />
            </ProtectedRoute>
          }
        />
        <Route
          path={SIGNUP}
          element={
            <ProtectedRoute isProtected={false} redirectTo={HOME}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path={FORGOT_PASSWORD}
          element={
            <ProtectedRoute isProtected={false} redirectTo={HOME}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path={EMAIL_VERIFICATION}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <EmailVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path={ADD_PHONE_NUMBER}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <AddPhoneNumber />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROFILE}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={FAVORITES}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path={SHOPPING_CART}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route
          path={ORDERS}
          element={
            <ProtectedRoute isProtected={true} redirectTo={HOME}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path={NO_FOUND} element={<NoFound />} />
      </Routes>
    </>
  );
}

export default App;
