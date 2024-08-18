import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:8000/api/drinks';

// Function to fetch all drinks (with optional user, month, and year parameters)
export const fetchDrinks = async (userId, month, year) => {
  try {
    // Construct the URL with query parameters
    const url = `${API_BASE_URL}?userId=${userId}&month=${month}&year=${year}`;

    // Make the GET request
    const response = await axios.get(url);

    // Return the number of drinks from the response data
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error fetching drinks:', error);
    throw error;
  }
};

// Function to fetch drinks by user ID
export const fetchDrinksByUser = async (userId) => {
  try {
    // Construct the URL with userId parameter
    const url = `http://localhost:8000/api/drinks/user/${userId}`;

    // Make the GET request
    const response = await axios.get(url);

    // Return the drinks data from the response
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error fetching drinks by user:', error);
    throw error;
  }
};

// Function to create a new drink
export const createDrink = async (userId) => {
  try {
    // Make the POST request
    const response = await axios.post(API_BASE_URL, { userId });

    // Return the created drink data from the response
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error creating drink:', error);
    throw error;
  }
};

// Function to fetch a drink by ID
export const fetchDrinkById = async (id) => {
  try {
    // Make the GET request
    const response = await axios.get(`${API_BASE_URL}/${id}`);

    // Return the drink data from the response
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error fetching drink by ID:', error);
    throw error;
  }
};

// Function to update a drink by ID
export const updateDrink = async (id, userId) => {
  try {
    // Make the PUT request
    const response = await axios.put(`${API_BASE_URL}/${id}`, { userId });

    // Return the updated drink data from the response
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error updating drink:', error);
    throw error;
  }
};

// Function to delete a drink by ID
export const deleteDrink = async (id) => {
  try {
    // Make the DELETE request
    await axios.delete(`${API_BASE_URL}/${id}`);

    // Return a success message or status
    return { message: 'Drink deleted successfully' };
  } catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error deleting drink:', error);
    throw error;
  }
};
