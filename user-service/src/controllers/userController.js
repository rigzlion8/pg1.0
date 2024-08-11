const db = require('../models/userModel');
const axios = require('axios');

exports.createUser = async (req, res) => {
  const { email, phone, id_number, dob } = req.body;
  const query = 'INSERT INTO Users (email, phone, id_number, dob) VALUES (?, ?, ?, ?)';
  
  db.query(query, [email, phone, id_number, dob], async (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error creating user', err });
    } else {
      // Create wallet
      const userId = result.insertId;
      await axios.post('http://localhost:5001/wallet', { userId, initialAmount: 100 });
      res.status(201).json({ message: 'User created successfully', userId });
    }
  });
};
