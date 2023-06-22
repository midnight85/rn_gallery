import axios from 'axios';

const API_KEY = '';

export const customFetch = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: `Authorization: Client-ID ${API_KEY}`,
});
