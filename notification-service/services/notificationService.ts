import nodemailer from "nodemailer";
import twilio from "twilio";
import webPush from "web-push";

// Ensure VAPID keys are set
if (!process.env.WEB_PUSH_PUBLIC_KEY || !process.env.WEB_PUSH_PRIVATE_KEY) {
  throw new Error("VAPID keys are not set. Please check your .env file.");
}

// Ensure Twilio credentials are set
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
  throw new Error("Twilio credentials are not set. Please check your .env file.");
}

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  process.env.WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export const sendEmail = async (recipient: string, subject: string, message: string) => {
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      text: message,
    });
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const sendSMS = async (recipient: string, message: string) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });
    console.log(`SMS sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};

export const sendPushNotification = async (subscription: webPush.PushSubscription, message: string) => {
  try {
    await webPush.sendNotification(subscription, message);
    console.log("Push notification sent");
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw new Error("Failed to send push notification");
  }
};
