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
          console.log("Done reading, final buffer:", buffer);
          if (buffer) {
            try {
              const parsed = JSON.parse(buffer);
              console.log("Parsed data:", parsed);
              if (parsed[resultKey]) {
                resolve(parsed[resultKey]);
              } else {
                reject(new Error("Missing resultKey in parsed JSON"));
              }
            } catch (error) {
              reject(new Error("Invalid JSON at the end"));
            }
          }
          return;
        }

        // Append the chunk and log it
        buffer += decoder.decode(value, { stream: true });
        console.log("Current buffer after chunk:", buffer);

        // Try to process the buffer
        let chunk = buffer;
        let validJSONFound = false;

        while (chunk) {
          try {
            const parsed = JSON.parse(chunk);
            console.log("Parsed chunk:", parsed);
            if (parsed[resultKey]) {
              resolve(parsed[resultKey]);
              validJSONFound = true;
              break;
            }
            chunk = chunk.substring(chunk.indexOf('}') + 1).trim();
          } catch (error) {
            break;
          }
        }

        if (!validJSONFound) {
          readChunk(); // Keep reading more chunks
        }
      } catch (error) {
        reject(error);
      }
    };

    readChunk();
  });
};



// Working Local
/*
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
        const chunks = buffer.split("\n");
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