import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import HomePage from "./pages/homePage";
import Search from "./pages/search/search";
import Product from "./pages/product/product";

import LogIn from "./pages/logIn/logIn";
import SignUp from "./pages/signUp/signUp";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import PasswordResetCode from "./pages/passwordResetCode/passwordResetCode";

import EmailVerification from "./pages/emailVerification/emailVerification";
import AddPhoneNumber from "./pages/addPhoneNumber/addPhoneNumber";
import Profile from "./pages/profile/profile";
import Favorites from "./pages/favorites/favorites";
import ShoppingCart from "./pages/shoppingCart/shoppingCart";
import Orders from "./pages/orders/orders";
import TooManyRequests from "./pages/tooManyRequests/tooManyRequests";
import NoFound from "./pages/noFound/noFound";

import {
  HOME,
  SEARCH,
  SEARCH_VALUE,
  PRODUCT,
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
  PASSWORD_RESET_CODE,

  EMAIL_VERIFICATION,
  ADD_PHONE_NUMBER,
  PROFILE,
  FAVORITES,
  SHOPPING_CART,
  ORDERS,

  TOO_MANY_REQUESTS,
  NO_FOUND,
} from "./routes";

function App() {
  return (
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
        path={PASSWORD_RESET_CODE}
        element={
          <ProtectedRoute isProtected={false} redirectTo={HOME}>
            <PasswordResetCode />
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

      <Route path={TOO_MANY_REQUESTS} element={<TooManyRequests />} />
      <Route path={NO_FOUND} element={<NoFound />} />
    </Routes>
  );
}

export default App;
