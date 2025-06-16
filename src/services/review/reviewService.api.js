import { apiAxios } from '../service';

export const getAccomReviewListAPI = async (accomNo) => {
  const response = await apiAxios.get(`/api/reviews/accommodation/${accomNo}`);
  console.log(response);
  return response.data;
};

export const getAccomLatestReviewAPI = async (accomNo) => {
  const response = await apiAxios.get(
    `/api/reviews/accommodation/${accomNo}/latest`
  );
  return response.data;
};

export const insertReviewAPI = async (formData) => {
  const response = await apiAxios.post('/api/reviews', formData);
  return response;
};

export const getAccomReviewAverageScoreAPI = async (accomNo) => {
  const response = await apiAxios.get(
    `/api/reviews/accommodation/${accomNo}/average`
  );
  return response.data;
};

export const getAccomReviewCountAPI = async (accomNo) => {
  const response = await apiAxios.get(
    `/api/reviews/accommodation/${accomNo}/count`
  );
  return response.data;
};
