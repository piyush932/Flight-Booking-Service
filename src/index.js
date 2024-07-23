const express = require("express");
const amqplib = require("amqplib");

// async function connectQueue() {
//   try {
//     const connection = await amqplib.connect("amqp://localhost");
//     const channel = await connection.createChannel();

//     await channel.assertQueue("noti-queue");
//     setInterval(() => {
//       channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(Hello)));
//     }, 1000);
//     await channel.sendToQueue("noti-queue", Buffer.from("Hello from RabbitMQ"));
//   } catch (error) {
//     console.log(error);
//   }
// } 

const { ServerConfig,Queue } = require("./config");
const apiRoutes = require("./routes");
const CRONS = require("./utils/common/cron-jobs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bookingService/api", apiRoutes);
app.use("/api", apiRoutes);

// app.listen(ServerConfig.PORT, () => {
//   console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
//   CRONS();
// });

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    CRONS();
    await Queue.connectQueue();
    console.log("queue connected")
});
