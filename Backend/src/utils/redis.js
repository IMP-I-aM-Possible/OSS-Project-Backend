import dotenv from "dotenv";
import redis from "redis";

dotenv.config();

const redisClient = redis.createClient();

redisClient.connect();

redisClient.on('connect', () => {
    console.info('Redis connected!');
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

export default redisClient;

