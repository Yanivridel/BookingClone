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
  
  // Read the entire response first
  const { result: fullData } = await readFullStream(reader);
  
  // Then process the chunks separately
  const chunks = fullData.split('\t').filter(chunk => chunk.trim().length > 0);
  
  // Create the promises to resolve
  let filteredPropertiesResult = null;
  let filtersResult = null;
  
  // Parse each chunk and extract the relevant data
  for (const chunk of chunks) {
    try {
      const parsed = JSON.parse(chunk);
      if (parsed.filteredProperties) {
        filteredPropertiesResult = parsed.filteredProperties;
      } else if (parsed.Filters) {
        filtersResult = parsed.Filters;
      }
    } catch (e) {
      console.error("Error parsing chunk:", e);
      console.log("Problematic chunk:", chunk.substring(0, 50) + "...");
    }
  }
  
  // Create the promises
  const firstChunkPromise = Promise.resolve(filteredPropertiesResult);
  const secondChunkPromise = Promise.resolve(filtersResult);
  
  return { firstChunkPromise, secondChunkPromise };
};

// Helper function to read the entire stream before processing
const readFullStream = async (reader: any) => {
  const decoder = new TextDecoder();
  let result = '';
  let done = false;
  
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      result += decoder.decode(value, { stream: !done });
    }
  }
  
  return { result, done };
};

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