const sendSMS = require("../utils/sendSMS");

const sendSMSHandler = async (req, res) => {
  const { to, message } = req.body;
  try {
    const response = await sendSMS(to, message);
    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendSMSHandler };
