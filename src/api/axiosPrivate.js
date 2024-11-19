import axios from "axios";
import auth from "../firebase.init"; // Firebase configuration
import { signOut } from "firebase/auth"; // Firebase sign-out
import { useNavigate } from "react-router-dom";


const axiosPrivate = axios.create({});

axiosPrivate.interceptors.request.use(
  async (config) => {
    // Add Authorization header if not already present
    if (!config.headers.authorization) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response, // Forward successful responses
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Assume there’s an endpoint to refresh the token
        const { data } = await axios.post("http://localhost:5000/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        localStorage.setItem("accessToken", data.accessToken);

        // Update the Authorization header with the new token
        originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Log out the user if token refresh fails
        signOut(auth);
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
