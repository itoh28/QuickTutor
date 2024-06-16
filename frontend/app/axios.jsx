import axios from 'axios';

axios.defaults.withCredentials = true;

const axios = axios.create({
  baseURL: 'https://quicktutor.work',
  withXSRFToken: true,
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;
