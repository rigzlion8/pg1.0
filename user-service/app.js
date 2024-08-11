const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('User Service running on port 5000'));
