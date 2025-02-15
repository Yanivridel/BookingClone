"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.connectRedis = connectRedis;
exports.setCache = setCache;
exports.getCache = getCache;
exports.clearUserCache = clearUserCache;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
exports.client = client;
client.on('error', (err) => console.log('❌ Redis Client Error:', err));
async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log('✅ Connected to Redis');
    }
}
async function setCache(key, value, expiration) {
    try {
        const REDIS_EXPIRATION = parseInt(process.env.REDIS_EXPIRATION);
        await client.set(key, JSON.stringify(value), { EX: REDIS_EXPIRATION });
    }
    catch (error) {
        console.error('❌ Redis Set Error:', error);
    }
}
async function getCache(key) {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (error) {
        console.error('❌ Redis Get Error:', error);
        return null;
    }
}
async function clearUserCache(userId) {
    await client.del(`search:${userId}`);
}
//# sourceMappingURL=redisClient.js.map