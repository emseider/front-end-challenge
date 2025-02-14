export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const API_KEY: string = import.meta.env.VITE_API_KEY;

export const API_HEADERS = {
  apikey: API_KEY,
  'api-version': '1.0',
  'Content-Type': 'application/json',
};

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  headers: API_HEADERS,
};

