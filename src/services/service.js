import axios from 'axios';
import { VITE_SERVER_BASE_URL } from '../../env.config';

export const apiAxios = axios.create({
  baseURL: VITE_SERVER_BASE_URL,
  withCredentials: true,
});
