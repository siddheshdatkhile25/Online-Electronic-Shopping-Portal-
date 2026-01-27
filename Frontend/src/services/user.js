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


export const sendOtp = async (email) => {
  try {
    const url = `${config.server}/api/users/forgot-password`;
    const response = await axios.post(url, { email }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Send OTP response:", response.data);
    return response.data;

  } catch (error) {
    console.error("Send OTP error:", error);
    return null;
  }
}

export const verifyOtp = async (verifyObj) => {

  try{
    const url = `${config.server}/api/users/verify-otp`;

    const response = await axios.post(url, verifyObj, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("We are in verifyOtp service");
    console.log("Verify OTP response:", response);
    return response.data;
  }catch (error) {
    console.error("Verify OTP error:", error);
  }
}

export const resetPassword = async (newPassword) => {
  try{
    const url = `${config.server}/api/users/reset-password`;
     console.log("Reset Password called ");
    const email = localStorage.getItem("verify-email");
    const otp = localStorage.getItem("verify-otp");
    console.log("Reset Password called with:", { email, otp, newPassword });
    const response = await axios.post(url, { email, otp, newPassword }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Reset Password response:", response.data);
    return response.data;

    }catch( error) {
    console.error("Reset Password error:", error);
    return response.error;
    }


  }

export const getUserProfile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const url = `${config.server}/api/users/${id}`;
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Get user profile response:", response.data);

    return response.data;

    
  } catch (error) {
    console.error("Get user profile error:", error);
    return null;
  }
};



