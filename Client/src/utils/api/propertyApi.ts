import { TPartialProperty } from '@/types/propertyTypes';
import axios from 'axios';

const LOCAL_HOST = 'http://localhost:3000';
const API_URL = LOCAL_HOST;

// * Done
export const getPropertyById = async (id : string) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/property/${id}`);
        return data.data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};

// * Working
export const searchPropertiesChunks = async (searchBody: TPartialProperty) => {
    const response = await fetch(`${API_URL}/api/property/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchBody),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body!.getReader();
    
    // Create first chunk promise
    const firstChunkPromise = createChunkReader(reader, 'firstResults');
    
    // Create second chunk promise that starts after first chunk is received
    const secondChunkPromise = firstChunkPromise.then(() => 
        createChunkReader(reader, 'secondResults')
    );

    return { firstChunkPromise, secondChunkPromise };
};

// Help functions
const createChunkReader = (reader: ReadableStreamDefaultReader<Uint8Array>, resultKey: 'firstResults' | 'secondResults') => {
    let buffer = '';
    const decoder = new TextDecoder();

    return new Promise((resolve, reject) => {
        const readChunk = async () => {
            try {
                const { value, done } = await reader.read();
                if (done) {
                    resolve(null);
                    return;
                }

                buffer += decoder.decode(value, { stream: true });
                const chunks = buffer.split('\n');
                buffer = chunks.pop() || ''; // Keep last incomplete chunk
                
                // Process complete chunks
                const foundResult = chunks.some(chunk => {
                    if (!chunk) return false;
                    
                    try {
                        const parsed = JSON.parse(chunk);
                        if (parsed[resultKey]) {
                            resolve(parsed[resultKey]);
                            return true;
                        }
                    } catch (e) {
                        console.error('Error parsing chunk:', e);
                    }
                    return false;
                });

                if (!foundResult) {
                    readChunk(); // Continue reading if result not found
                }
            } catch (error) {
                reject(error);
            }
        };

        readChunk();
    });
};
