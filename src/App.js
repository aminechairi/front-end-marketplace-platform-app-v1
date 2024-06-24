import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";

import HomePage from "./pages/homePage";
import NoFound from "./pages/noFound/noFound";
import LogIn from "./pages/logIn/logIn";
import SignUp from "./pages/signUp/signUp";
import EmailVerification from "./pages/emailVerification/emailVerification";

import { HOME, NO_FOUND, LOGIN, SIGNUP, EMAIL_VERIFICATION } from "./routes";

function App() {
  return (
    <Routes>
      <Route path={HOME} element={<HomePage />} />
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
