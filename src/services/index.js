import axios from 'axios';
import { VITE_SERVER_BASE_URL } from '../../env.config';
const baseURL = VITE_SERVER_BASE_URL;

export const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
