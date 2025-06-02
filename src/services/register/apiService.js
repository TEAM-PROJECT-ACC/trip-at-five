import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';
const baseURL = serverBaseURL;

const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const emailDuplicationCheck = async (email) => {
  const response = await apiAxios.get(`/register/emailDuplication?email=${email}`);
  return response.data;
};
