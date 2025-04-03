import a from 'axios';

import { API_URL } from '@/config';

export const axios = a.create({
  baseURL: API_URL,
  timeout: 10000,
});
