// backend/controllers/userController.js
const db = require('../models/db');

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, mobilenumber } = req.body;
  const sql = 'INSERT INTO users (name, email, mobilenumber) VALUES (?, ?, ?)';
  try {
    const [results] = await db.query(sql, [name, email, mobilenumber]);
    res.status(201).json({ id: results.insertId, name, email, mobilenumber });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const sql = 'SELECT * FROM users';
  try {
    const [results] = await db.query(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobilenumber } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, mobilenumber = ? WHERE id = ?';
  try {
    await db.query(sql, [name, email, mobilenumber, id]);
    res.status(200).json({ id, name, email, mobilenumber });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  try {
    await db.query(sql, [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
};
