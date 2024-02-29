import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/products/:id" element={<></>} />      
    </Routes>
  );
}

export default App;