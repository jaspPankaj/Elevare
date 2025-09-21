import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../components/AuthContext";

const GoogleLoginButton = ({ onSuccess }) => {

  const { user,logout,googleLogin} = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    if (!isLoggedIn && window.google) {
      /* global google */
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, [isLoggedIn]);

  const handleCredentialResponse = async (response) => {
  try {
    // send credential (JWT) to backend
    const res = await api.post("/auth/google/", {
      credential: response.credential,
    });

    // store tokens
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    // decode Google JWT to get profile info
    const base64Url = response.credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const profile = JSON.parse(window.atob(base64));

    // save in localStorage & context
    localStorage.setItem("username", profile.name);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("picture", profile.picture);

    googleLogin({
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    });

    setIsLoggedIn(true);
    window.location.href = "/elevare/dashboard";
    

  } catch (error) {
    console.error("Google login error:", error);
  }
};


  const handleLogout = () => {     
    logout();
    setIsLoggedIn(false);
  }

  return (
    <div className="flex flex-col items-center">
      {!isLoggedIn && (
        <div id="google-login-btn"></div>
      ) }
    </div>
  );
};

export default GoogleLoginButton;
