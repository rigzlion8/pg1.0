const db = require('../models/walletModel');

exports.createWallet = (req, res) => {
  const { userId, initialAmount } = req.body;
  
  db.query('INSERT INTO Wallets (user_id, balance) VALUES (?, ?)', [userId, initialAmount], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error creating wallet', err });
    } else {
      db.query('INSERT INTO Transactions (user_id, type, amount) VALUES (?, ?, ?)', [userId, 'credit', initialAmount], (err) => {
        if (err) {
          res.status(500).json({ message: 'Error creating transaction', err });
        } else {
          res.status(201).json({ message: 'Wallet created successfully', walletId: result.insertId });
        }
      });
    }
  });
};

exports.transferFunds = (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  
  // Deduct from sender's wallet
  db.query('UPDATE Wallets SET balance = balance - ? WHERE user_id = ?', [amount, fromUserId], (err) => {
    if (err) return res.status(500).json({ message: 'Error updating sender wallet', err });
    
    // Add to recipient's wallet
    db.query('UPDATE Wallets SET balance = balance + ? WHERE user_id = ?', [amount, toUserId], (err) => {
      if (err) return res.status(500).json({ message: 'Error updating recipient wallet', err });

      // Record transaction for both users
      db.query('INSERT INTO Transactions (user_id, type, amount) VALUES (?, ?, ?), (?, ?, ?)', 
      [fromUserId, 'debit', amount, toUserId, 'credit', amount], (err) => {
        if (err) return res.status(500).json({ message: 'Error recording transaction', err });

        // Notify the recipient
        axios.post('http://localhost:5002/notify', { toUserId, amount });

        res.status(200).json({ message: 'Funds transferred successfully' });
      });
    });
  });
};
