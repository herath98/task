import axios, { AxiosRequestConfig } from 'axios';

// Assuming you have a function to get the token
const getAuthToken = (): string | null => {
  // Replace this with your token retrieval logic
  return localStorage.getItem('authToken');
};

const API_URL = 'https://skill-test.similater.website/api/v1';

const getAuthConfig = (): AxiosRequestConfig => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password });
    // Save the token in local storage or state
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/check`, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPropertyList = async () => {
  try {
    const response = await axios.get(`${API_URL}/property/list`, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};
