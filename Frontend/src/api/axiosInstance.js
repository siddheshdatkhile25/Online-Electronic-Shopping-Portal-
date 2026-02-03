import axios from "axios";

const api = axios.create({
   baseURL: "http://13.200.137.111:8080",
  
});


delete axios.defaults.headers.common["Content-Type"];
delete axios.defaults.headers.post["Content-Type"];
delete axios.defaults.headers.put["Content-Type"];
delete axios.defaults.headers.patch["Content-Type"];

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  delete config.headers["Content-Type"];

  return config;
});

export default api;
