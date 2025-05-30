import axios from 'axios';
import { serverBaseURL } from './serverBaseURL';
const baseURL = serverBaseURL;

export const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
