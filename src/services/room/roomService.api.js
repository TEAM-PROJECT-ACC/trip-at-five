import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';

const apiAxios = axios.create({
  baseURL: serverBaseURL,
  withCredentials: true,
});

export const roomInsertAPI = async (roomData) => {
  const response = await apiAxios.post('/rooms', roomData);
  console.log(response.data);
};
