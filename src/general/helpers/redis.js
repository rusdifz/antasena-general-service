"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const brokerType = require('redis-streams-broker').StreamChannelBroker;
let port = process.env.REDIS_PORT;
let host = process.env.REDIS_HOST;
let pass = process.env.REDIS_PASSWORD;
const redis = new Redis({
    port: port,
    host: host
});
const redisClient = new brokerType(redis, "saveLog");
//Used to publish a paylod on stream.
//  const payloadId = await broker.publish({ a: "test2 ", b: "test2" });
//  console.log(`Pushed message into stream with id: ${payloadId}`);
// const redisClient = redis.createClient({
//     host: host, 
//     port: port , 
//     password: pass
// })
// // console.log('redis client', redisClient);
// redisClient.on('error', err => {
//     if (!err){
//         console.log('redis sukses');
//     }else{
//         console.log('Error ' + err);
//     }
// });
exports.default = redisClient;
// new Redis({
//     port: 6379, // Redis port
//     host: "127.0.0.1", // Redis host
//     family: 4, // 4 (IPv4) or 6 (IPv6)
//     password: "auth",
//     db: 0,
//   });
