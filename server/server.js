// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const userRoutes = require('./routes/userRoute');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount the user routes at /users
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
