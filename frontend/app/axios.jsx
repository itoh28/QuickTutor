import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://quicktutor.work',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
