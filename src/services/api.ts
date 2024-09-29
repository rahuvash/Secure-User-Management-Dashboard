import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    // Type assertion to check if the error is an AxiosError
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Request failed with status code ${error.response.status}`);
    } else {
      throw new Error('Request failed with status code 400');
    }
  }
};

export const signUp = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  // console.log(response.data)
  return response.data;
};

// Fetch users with pagination
export const fetchUsers = async (page: number = 1) => {
  const response = await axios.get(`${API_URL}/users`, { params: { page } });
  return response.data;
};
