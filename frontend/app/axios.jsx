import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://quicktutor.work',
  withXSRFToken: true,
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.withCredentials = true;

export default axios;
