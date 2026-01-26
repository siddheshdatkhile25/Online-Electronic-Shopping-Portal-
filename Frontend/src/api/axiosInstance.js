import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

<<<<<<< HEAD
// 🔐 ADD THIS PART
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
=======
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
>>>>>>> 3fd2087cf38e63001e11315a21ae19361b956526

export default api;
