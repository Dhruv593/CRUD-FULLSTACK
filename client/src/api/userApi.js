// src/api/userApi.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL; // Your Express backend endpoint

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log("API Response:", response.data); // Debugging
    return response.data.users || []; // Ensure users array is returned
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Create a new user
export const createUser = async (data) => {
  return await axios.post(apiUrl, data);
};

// Update an existing user
export const updateUser = async (id, data) => {
  return await axios.put(`${apiUrl}/${id}`, data);
};

// Delete a user
export const deleteUser = async (id) => {
  return await axios.delete(`${apiUrl}/${id}`);
};
