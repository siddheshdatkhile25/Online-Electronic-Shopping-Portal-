import axios from "axios";
import { config } from "./config";

export const loginUser = async (user) => {
  try {
    const url = `${config.server}/api/users/login`;
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const registerUser = async (user) => {
  try {
    const url = `${config.server}/api/users/register`;
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    return null;
  }
};
