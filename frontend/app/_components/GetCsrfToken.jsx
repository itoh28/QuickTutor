'use client';

import { useEffect } from 'react';
import axios from 'axios';

const GetCsrfToken = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      await axios.get('https://quicktutor.work/sanctum/csrf-cookie', {
        withCredentials: true,
      });
    };

    getCsrfToken();
  }, []);

  return null;
};

export default GetCsrfToken;
