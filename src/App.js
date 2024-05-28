import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import LogIn from "./pages/logIn/logIn";
import SignUp from "./pages/signUp/signUp";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/products/:id" element={<></>} />
    </Routes>
  );
}

export default App;