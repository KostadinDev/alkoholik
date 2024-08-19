import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const BASE_URL = `https://alkoholik-backend.onrender.com/api`;
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user?token=${localStorage.getItem('token')}`, { withCredentials: true });
    return response?.data?.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Function to handle login success
export const handleLoginSuccess = async (token) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/google`, { token }, { withCredentials: true });
    const decoded = jwtDecode(token);
    localStorage.setItem('token', res?.data?.token);
    return decoded;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

// Function to handle logout
export const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
