import { User } from "../types/user/user";
import api from "./api";

interface LoginResponse {
  accessToken: string,
  isValid: boolean
}

export const login = async (credentials: User): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
