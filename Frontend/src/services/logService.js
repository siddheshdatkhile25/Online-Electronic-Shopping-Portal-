import axios from "axios";

export const logActivity = async ({ userId, action }) => {
  try {
    await axios.post("http://localhost:5000/api/logs", {
      userId: userId,
      action: action,
      ipAddress: window.location.hostname
    });
  } catch (err) {
    console.error("Logging failed", err);
  }
};
