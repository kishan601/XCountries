import { Country } from '../types/country';

const API_URL = 'https://xcountries-backend.azurewebsites.net/all';
const CACHE_KEY = 'countries_data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchCountries(): Promise<Country[]> {
  // Check if we have a valid cache
  if (hasCachedData()) {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data, timestamp } = JSON.parse(cache);
        // Use cache if it's less than 24 hours old
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log('Using cached country data');
          return data;
        }
      }
    } catch (err) {
      console.warn('Error reading cache:', err);
    }
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Cache the data
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Try to use cached data even if it's expired
    if (localStorage.getItem(CACHE_KEY)) {
      try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '');
        console.warn('Using expired cache due to fetch error');
        return cache.data;
      } catch (cacheError) {
        console.error('Error reading cache:', cacheError);
      }
    }
    
    throw error;
  }
}

export function hasCachedData(): boolean {
  return localStorage.getItem(CACHE_KEY) !== null;
}

export function getCacheAge(): number {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (cache) {
      const { timestamp } = JSON.parse(cache);
      return Date.now() - timestamp;
    }
  } catch (err) {
    console.warn('Error reading cache timestamp:', err);
  }
  return Infinity;
}