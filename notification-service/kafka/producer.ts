import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"], // Replace with your Kafka broker(s)
});

const producer = kafka.producer();

export const sendToKafka = async (topic: string, message: object) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  console.log(`Message sent to Kafka topic "${topic}":`, message);
};
