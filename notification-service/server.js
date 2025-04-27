const express = require('express');
const dotenv = require('dotenv');
const smsRoutes = require('./routes/smsRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/sms', smsRoutes);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`SMS Service running on port ${PORT}`));
