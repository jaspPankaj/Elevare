import { BrowserRouter, Routes, Route } from "react-router-dom";

import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
import { UserHandle } from "./pages/UserHandle";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <BrowserRouter basename="/elevare"> {/* <-- replace with your repo name */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserHandle method="register" />} />
        <Route path="/login" element={<UserHandle method="login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </BrowserRouter>
  );
};
