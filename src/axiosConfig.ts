import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Rails API のベース URL
  headers: {
    'Content-Type' : 'application/json ',
  },
});

export default api;
