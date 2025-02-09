// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const userRoutes = require('./routes/userRoute');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

// Mount the user routes at /users
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend is Running on Vercel!');
});

module.exports = app;