// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import API from "../api";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // optional: fetch protected data
    API.get("profile/")
      .then((res) => setProfileData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>
      <div className="mt-6">
        <p>Context user: {user ? JSON.stringify(user) : "No user in context"}</p>
        <p className="mt-2">Profile endpoint: {profileData ? JSON.stringify(profileData) : "Loading..."}</p>
      </div>
    </div>
  );
}
