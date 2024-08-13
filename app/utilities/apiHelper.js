import axios from "axios";
import { defaultApiErrorMessage } from "./utility";

const apiHelper = axios.create({
  baseURL: "http://127.0.0.1:3001/api/v1", // Set your base API URL here
  timeout: 10000, // Optional: set a timeout for requests (in milliseconds)
  withCredentials: true,
});

// Request Interceptor: Attach Authorization token if available
apiHelper.interceptors.request.use(
  (config) => {
    // Get token from local storage or any other secure storage
    const userData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(userData);
    if (parsedUserData?.token) {
      config.headers["Authorization"] = `Bearer ${parsedUserData.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// Response Interceptor: Handle responses and errors
apiHelper.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data from the response
  },
  (error) => {
    console.log("🚀 ~ error:", error);
    // Handle common errors (like 401, 500, etc.)

    if (error.response) {
      const status = error.response.status;
      if (status) {
        // This will allow 404 errors to be handled in the try block
        return error.response;
      } else {
        console.error(
          `Error: ${error.response.status} - ${error.response.data.message}`
        );
      }
    } else {
      console.error("Network error or timeout");
    }
    return Promise.reject(
      new Error(
        error.response?.data?.message ||
          error?.response?.statusText ||
          defaultApiErrorMessage
      )
    );
  }
);

// Helper functions for making API calls

export const get = (url, config = {}) => {
  return apiHelper.get(url, config);
};

export const post = (url, data, config = {}) => {
  return apiHelper.post(url, data, config);
};

export const put = (url, data, config = {}) => {
  return apiHelper.put(url, data, config);
};

export const del = (url, config = {}) => {
  return apiHelper.delete(url, config);
};

export default apiHelper;
