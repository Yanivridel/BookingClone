import { ISearchPropertiesReq } from "@/types/propertyTypes";
import axios from "axios";

const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const API_URL = isProduction
  ? import.meta.env.VITE_API_URL_CLOUD
  : import.meta.env.VITE_API_URL_LOCAL;

// * Done
export const getPropertyById = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/property/${id}`);    
    return data.data;
  } catch (error) {
    console.error("Auth check error:", error);
    throw error;
  }
};

// * Done
export const getPropertyByIdForCard = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/property/card/${id}`);
    return data.data;
  } catch (error) {
    console.error("Auth check error:", error);
    throw error;
  }
};

// * Working
export const searchPropertiesChunks = async (
  searchBody: ISearchPropertiesReq,
  page?: number,
  limit?: number
) => {
  
  page ??= 1;
  limit ??= 15;
  const response = await fetch(`${API_URL}/api/property/?page=${page}&limit=${limit}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body!.getReader();

  // Create first chunk promise
  const firstChunkPromise = createChunkReader(reader, "filteredProperties");

  // Create second chunk promise that starts after first chunk is received
  const secondChunkPromise = firstChunkPromise.then(() =>
    createChunkReader(reader, "Filters")
  );

  return { firstChunkPromise, secondChunkPromise };
};

const createChunkReader = (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  resultKey: "filteredProperties" | "Filters"
) => {
  let buffer = "";
  const decoder = new TextDecoder();

  return new Promise((resolve, reject) => {
    const readChunk = async () => {
      try {
        const { value, done } = await reader.read();
        if (done) {
          // If we reach the end of the stream and have data in buffer, try to parse it
          if (buffer.trim().length > 0) {
            try {
              const parsed = JSON.parse(buffer);
              if (parsed[resultKey]) {
                resolve(parsed[resultKey]);
                return;
              }
            } catch (e) {
              console.error("Final attempt to parse buffer failed:", e);
            }
          }
          resolve(null);
          return;
        }

        // Append new data to existing buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Split by tab character (our delimiter)
        let tabIndex = buffer.indexOf('\t');
        
        // If we found a tab, we potentially have a complete chunk
        if (tabIndex !== -1) {
          // Get the potential JSON string (everything before the tab)
          const potentialJson = buffer.substring(0, tabIndex);
          
          // Log for debugging
          console.log(`Potential JSON chunk for ${resultKey}:`, potentialJson.substring(0, 50) + "...");
          
          try {
            const parsed = JSON.parse(potentialJson);
            if (parsed[resultKey]) {
              // We found what we're looking for
              resolve(parsed[resultKey]);
              return;
            } else {
              // We found valid JSON but not the key we're looking for
              // Remove this chunk from buffer and continue
              buffer = buffer.substring(tabIndex + 1);
              readChunk();
            }
          } catch (e) {
            // If parsing failed, it could be an incomplete JSON object
            // In this case, wait for more data by calling readChunk()
            console.warn(`Parsing failed for ${resultKey}, waiting for more data...`);
            // Keep our buffer intact and read more data
            readChunk();
          }
        } else {
          // No tab found yet, need more data
          readChunk();
        }
      } catch (error) {
        console.error(`Error in chunk reader for ${resultKey}:`, error);
        reject(error);
      }
    };

    readChunk();
  });
};

/* 
// Working BASE
const createChunkReader = (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  resultKey: "filteredProperties" | "Filters"
) => {
  let buffer = "";
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
        const chunks = buffer.split("\t");
        buffer = chunks.pop() || ""; // Keep last incomplete chunk

        // ! DEBUG
        chunks.forEach((chunk) => {
          console.log("Raw Chunk:", chunk);  // Log raw chunk before parsing
        });

        
        // Process complete chunks
        const foundResult = chunks.some((chunk) => {
          if (!chunk) return false;

          try {
            const parsed = JSON.parse(chunk);
            if (parsed[resultKey]) {
              resolve(parsed[resultKey]);
              return true;
            }
          } catch (e) {
            console.error("Error parsing chunk:", e);
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
*/


// * Done
export const getAutocompleteLocations = async (searchText: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/property/location-search-autocomplete/${searchText}`);
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};