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

const logNotificationEvent = (type: string, recipient: string, status: string, message: string) => {
  console.log(`[${new Date().toISOString()}] Notification Event:`, {
    type,
    recipient,
    status,
    message,
  });
};

const retry = async (fn: () => Promise<void>, retries: number = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await fn();
      return;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.warn(`Retrying (${attempt}/${retries})...`);
    }
  }
};

export const sendEmail = async (recipient: string, subject: string, message: string) => {
  try {
    await retry(async () => {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject,
        text: message,
      });
    });
    logNotificationEvent("email", recipient, "success", message);
  } catch (error) {
    logNotificationEvent("email", recipient, "failure", message);
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const sendSMS = async (recipient: string, message: string) => {
  try {
    await retry(async () => {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: recipient,
      });
    });
    logNotificationEvent("sms", recipient, "success", message);
  } catch (error) {
    logNotificationEvent("sms", recipient, "failure", message);
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};

export const sendPushNotification = async (subscription: webPush.PushSubscription, message: string) => {
  try {
    await retry(async () => {
      await webPush.sendNotification(subscription, message);
    });
    logNotificationEvent("push", JSON.stringify(subscription), "success", message);
  } catch (error) {
    logNotificationEvent("push", JSON.stringify(subscription), "failure", message);
    console.error("Error sending push notification:", error);
    throw new Error("Failed to send push notification");
  }
};
