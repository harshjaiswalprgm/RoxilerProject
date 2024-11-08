const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seedData');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

// Seed database on start
seedDatabase();

module.exports = app;
