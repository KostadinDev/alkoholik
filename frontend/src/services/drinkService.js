import axios from 'axios';
import { BASE_URL } from './authService';

// Helper function to handle GET requests
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}?token=${localStorage.getItem('token')}`, { params });
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching data from ${endpoint}:`, error);
    return null;
  }
};

// Helper function to handle POST requests
export const postData = async (endpoint, data = {}) => {
  const response = await axios.post(`${BASE_URL}/${endpoint}?token=${localStorage.getItem('token')}`, data);
  return response.data;
};

// Helper function to handle PUT requests
export const putData = async (endpoint, data = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error putting data to ${endpoint}:`, error);
    return null;
  }
};

// Helper function to handle DELETE requests
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error deleting data from ${endpoint}:`, error);
    return null;
  }
};

// Function to fetch all drinks (with optional user, month, and year parameters)
export const fetchDrinks = async (userId, month = null) => {
  const params = { userId, month };
  return fetchData('drinks', params);
};

// Function to fetch drinks by user ID with optional month filter
export const fetchDrinksByUser = async (userId, month = null) => {
  return fetchDrinks(userId, month);
};

// Function to create a new drink
export const createDrink = async (type, notes, location) => {
  const formattedLocation = { ...location };
  delete formattedLocation.error;
  return postData('drinks', { type, notes, location: formattedLocation });
};

// Function to fetch a drink by ID
export const fetchDrinkById = async (id) => {
  return fetchData(`drinks/${id}`);
};

// Function to update a drink by ID
export const updateDrink = async (id, userId) => {
  return putData(`drinks/${id}`, { userId });
};

// Function to delete a drink by ID
export const deleteDrink = async (id) => {
  return deleteData(`drinks/${id}`);
};
