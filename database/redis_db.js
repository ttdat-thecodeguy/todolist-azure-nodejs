const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

module.exports = { client };