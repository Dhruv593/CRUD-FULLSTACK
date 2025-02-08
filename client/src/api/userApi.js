// src/api/userApi.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL; // Your Express backend endpoint

if (!apiUrl) {
  console.error("API URL is not set. Check your .env file!");
}

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    console.log("API Response:", response.data);
    return response.data.users || [];
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return [];
  }
};

// Create a new user
export const createUser = async (data) => {
  try {
    const response = await axios.post(apiUrl, data);
    console.log("User Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, data) => {
  return await axios.put(`${apiUrl}/${id}`, data);
};

// Delete a user
export const deleteUser = async (id) => {
  return await axios.delete(`${apiUrl}/${id}`);
};
