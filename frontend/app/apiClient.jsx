import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: 'https://quicktutor.work',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
