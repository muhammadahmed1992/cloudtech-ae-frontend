import axios from "axios";
import { StatusCodes } from "../constants/status-codes";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Something went wrong, please try again later';

      if (process.env.NODE_ENV === 'development') {
        console.error('Error Response:', error.response);
      }

      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Unauthorized');
        }
        localStorage.removeItem("accessToken");
      }

      if (error.response.status === StatusCodes.NOT_FOUND) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Resource not found');
        }
      }

      if (error.response.status >= StatusCodes.SERVER_ERROR) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Server error - try again later');
        }
      }

      return Promise.reject({
        message: errorMessage,
        statusCode: error.response.status
      });
    } else if (error.request) {
      if (process.env.NODE_ENV === 'development') {
        console.error('No response received:', error.request);
      }
      return Promise.reject({ message: 'No response received from the server.', statusCode: null });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in request setup:', error.message);
      }
      return Promise.reject({ message: 'Error in setting up the request.', statusCode: null });
    }
  }
);

export default api;
