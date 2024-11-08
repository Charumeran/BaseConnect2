import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? ' https://git.heroku.com/charumeran.git/api/v1'
    : 'http://localhost:3000/api/v1', // Rails API のベース URL
  headers: {
    'Content-Type': 'application/json', // スペースを削除
  },
});

export default api;
