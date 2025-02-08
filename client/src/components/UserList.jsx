// src/components/UserList.js
import React from 'react';

const UserList = ({ users, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users List</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email} - {user.mobilenumber}</p>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <button
                onClick={() => handleEdit(user)}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
