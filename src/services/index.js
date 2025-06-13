import axios from 'axios';
// import { serverBaseURL } from './serverBaseURL';
import {VITE_WEB_SOCKET_URL} from '../../env.config'
const baseURL = VITE_WEB_SOCKET_URL;

export const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
