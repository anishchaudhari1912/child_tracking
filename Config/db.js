const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/child_tracking"; // replace 'hotels' with your DB name

mongoose.connect(mongoURL); // no need for deprecated options

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
