import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch all users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log("API Response:", response);

      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        console.error("Unexpected response format:", response);
        setUsers([]); // Default to an empty array
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Ensure users is always an array
    }
  };

  // Handle input change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to add or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
      // Update an existing user
      try {
        await updateUser(editingUserId, formData);
        setEditingUserId(null);
        setFormData({ name: "", email: "", mobilenumber: "" });
        fetchUsers();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      // Create a new user
      try {
        await createUser(formData);
        setFormData({ name: "", email: "", mobilenumber: "" });
        fetchUsers();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  // Prepare form for editing an existing user
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      mobilenumber: user.mobilenumber,
    });
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        CRUD <br /><p className="text-[20px]">(MySQL, React and Express)</p>
      </h1>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingUserId={editingUserId}
        />
      </div>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mt-6">
        <UserList
          users={Array.isArray(users) ? users : []}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
