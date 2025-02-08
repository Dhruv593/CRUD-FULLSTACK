// backend/controllers/userController.js
const db = require('../models/db');

// Create a new user
exports.createUser = (req, res) => {
  const { name, email, mobilenumber } = req.body;
  const sql = 'INSERT INTO users (name, email, mobilenumber) VALUES (?, ?, ?)';
  db.query(sql, [name, email, mobilenumber], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: results.insertId, name, email, mobilenumber });
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Update a user by ID
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, mobilenumber } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, mobilenumber = ? WHERE id = ?';
  db.query(sql, [name, email, mobilenumber, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ id, name, email, mobilenumber });
  });
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
