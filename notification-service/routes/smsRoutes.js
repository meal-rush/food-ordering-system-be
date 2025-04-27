const express = require('express');
const { sendSMSHandler } = require('../controllers/smsController');

const router = express.Router();

// POST /api/sms/send
router.post('/send', sendSMSHandler);

module.exports = router;
