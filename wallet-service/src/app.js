const express = require('express');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(express.json());

app.use('/api/wallet', walletRoutes);

app.listen(5001, () => console.log('Wallet Service running on port 5001'));
