import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";

import HomePage from "./pages/homePage";
import Search from "./pages/search/search";
import NoFound from "./pages/noFound/noFound";
import LogIn from "./pages/logIn/logIn";
import SignUp from "./pages/signUp/signUp";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import PasswordResetCode from "./pages/passwordResetCode/passwordResetCode";
import EmailVerification from "./pages/emailVerification/emailVerification";

import {
  HOME,
  SEARCH,
  NO_FOUND,
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
  PASSWORD_RESET_CODE,
  EMAIL_VERIFICATION,
} from "./routes";

function App() {
  return (
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route path={SEARCH} element={<Search />} />
      <Route path={NO_FOUND} element={<NoFound />} />
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
    </Routes>
  );
}

export default App;
