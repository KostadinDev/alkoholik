

// src/drinkService.js

import axios from 'axios';

// Function to fetch the number of drinks
export const fetchDrinks = async (user, month, year) => {
  try {
    // Construct the URL with query parameters
    const url = `http://localhost:8000/drinks?user=${user}&month=${month}&year=${year}`;

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
