import { Kafka } from "kafkajs";
import { sendEmail, sendSMS, sendPushNotification } from "../services/notificationService";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"], // Replace with your Kafka broker(s)
});

const consumer = kafka.consumer({ groupId: "notification-group" });

export const consumeFromKafka = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const notification = JSON.parse(message.value?.toString() || "{}");
      const { recipient, type, content, subscription } = notification;

      console.log(`[${new Date().toISOString()}] Processing notification:`, notification);

      try {
        if (type === "email") {
          await sendEmail(recipient, "Notification", content);
        } else if (type === "sms") {
          await sendSMS(recipient, content);
        } else if (type === "push" && subscription) {
          await sendPushNotification(subscription, content);
        } else {
          console.error("Invalid notification type or missing subscription for push notification");
        }
      } catch (error) {
        console.error("Error processing notification:", error);
      }
    },
  });
};
