// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Register } from "./pages/Register";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
    
  );
}
