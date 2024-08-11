const express = require('express');
const router = express.Router();
const { createWallet, transferFunds } = require('../controllers/walletController');

router.post('/wallet', createWallet);
router.post('/transfer', transferFunds);

module.exports = router;
