import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';

const apiAxios = axios.create({
  baseURL: serverBaseURL,
  withCredentials: true,
});

/**
 * 객실 등록 API
 * @param {*} formData
 * @returns
 */
export const roomInsertAPI = async (formData) => {
  const response = await apiAxios.post(
    `/admin/accommodations/${formData.get('accomNo')}/rooms`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  console.log(response);
  return response.status;
};
