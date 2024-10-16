import { User } from '../types/user/user';
import api from './api';

export const register = async (userData: User) => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
