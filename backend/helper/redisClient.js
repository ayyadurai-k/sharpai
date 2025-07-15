const { createClient } = require('redis');

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1', 
        port: process.env.REDIS_PORT || 6379, 
    },
});

redisClient.on('connect', () => {
    console.log('Redis Connected Successfully');
});

redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Redis Connection Failed:', err.message);
    }
};

connectRedis();

module.exports = redisClient;
