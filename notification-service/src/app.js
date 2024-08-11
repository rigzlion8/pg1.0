const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

app.use('/api/notify', notificationRoutes);

app.listen(5002, () => console.log('Notification Service running on port 5002'));
