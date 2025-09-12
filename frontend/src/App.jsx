// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFoundPage";
import  NavBar  from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import {useAuthentication} from "./auth";

import RedirectGoogleAuth from "./components/GoogleRedirecthandler"



export default function App() {

  const {isAuthorized} = useAuthentication();

  const ProtectedLogin = () =>{
    return isAuthorized ? <Navigate to='/' /> : <AuthPage initialMethod='login' />
  }
  const ProtectedRegister = () =>{
    return isAuthorized ? <Navigate to='/' /> : <AuthPage initialMethod='register' />
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth/>} />
        <Route path="/register" element={<ProtectedRegister />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
    
  );
}
