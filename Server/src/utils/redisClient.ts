import mongoose from "mongoose";
import { createClient } from 'redis';


const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

client.on('error', (err) => console.log('❌ Redis Client Error:', err));

async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log('✅ Connected to Redis');
    }
}

async function setCache(key: string, value: any, expiration?: number) {
    try {
        const REDIS_EXPIRATION = parseInt(process.env.REDIS_EXPIRATION as string);
        await client.set(key, JSON.stringify(value), { EX: REDIS_EXPIRATION});
    } catch (error) {
        console.error('❌ Redis Set Error:', error);
    }
}
async function getCache(key: string) {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('❌ Redis Get Error:', error);
        return null;
    }
}

async function clearUserCache(userId: string) {
    await client.del(`search:${userId}`);
}

// Exporting the functions and client
export { connectRedis, setCache, getCache, clearUserCache, client };
