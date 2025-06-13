import { apiAxios } from '../service';

export const insertReviewAPI = async (formData) => {
  const response = await apiAxios.post('/api/reviews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
