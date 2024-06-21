// backend/utils/rabbitmq.js

const amqp = require('amqplib');

let channel, connection;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect('amqp://localhost'); // Update with your RabbitMQ server URL
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
}

async function sendToQueue(queueName, data) {
    try {
        if (!channel) {
            await connectRabbitMQ();
        }
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        console.log(`Message sent to queue: ${queueName}`);
    } catch (error) {
        console.error('Error sending to queue', error);
    }
}

module.exports = { connectRabbitMQ, sendToQueue };
