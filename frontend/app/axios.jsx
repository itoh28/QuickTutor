import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://quicktutor.work',
  withCredentials: true,
  withXSRFToken: true,
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;
