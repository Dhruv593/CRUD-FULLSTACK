// src/api/userApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/users'; // Your Express backend endpoint

// Get all users
export const getUsers = async () => {
  return await axios.get(apiUrl);
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
