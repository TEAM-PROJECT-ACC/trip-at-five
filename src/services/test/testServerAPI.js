import axios from 'axios';
import { serverSaseURL } from '../serverSaseURL';
const baseURL = serverSaseURL;

const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const testServer = async () => {
  const response = await apiAxios.get('/');
  console.log(response.data);
  return response.data;
};
