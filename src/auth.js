import api from "./api"

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await api.post("/token/refresh/", { refresh }, {
      headers: { "Content-Type": "application/json" }
    });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (err) {
    console.error("Token refresh failed", err);
    localStorage.clear();
    return null;
  }
};


// Manual Register
export const register = async (name, username, email, password, password2) => {
  const userData = {
    name,
    username,
    email,
    password,
    password2,
  };
  console.log(userData); // check payload

  const response = await api.post("/register/", userData, {
    headers: { "Content-Type": "application/json" } // ⚡ crucial
  });
  return response.data;
};


export const login = async (credentials) => {
  const response = await api.post("/login/", credentials, {
    headers: { "Content-Type": "application/json" }
  });
  const { access, refresh } = response.data;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  return response.data;
};


//Logout Function

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/elevare";
};

 