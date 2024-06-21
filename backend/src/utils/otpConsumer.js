const amqp = require('amqplib');
const { sendEmail } = require('./sendEmail');

async function startConsumer() {
    try {
        const connection = await amqp.connect('amqp://localhost'); // Update with your RabbitMQ server URL
        const channel = await connection.createChannel();
        const queueName = 'otp_queue';

        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const { email, otp } = JSON.parse(msg.content.toString());
                await sendEmail(email,otp);
                channel.ack(msg);
                console.log(`Processed message from ${queueName}:`, { email, otp });
            }
        });

        console.log('OTP consumer started');
    } catch (error) {
        console.error('Error starting consumer', error);
    }
}

module.exports = { startConsumer };
