import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://quicktutor.work',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;
