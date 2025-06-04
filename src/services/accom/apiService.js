import { apiAxios } from '..';

export const searchAccommodationByKeyword = async (params) => {
  const response = await apiAxios.get('/accommodations', { params });
  console.log(response);
  return response.data;
};

export const AccommodationDetailByAccomSq = async (accomSq) => {
  const response = await apiAxios.get(`/accommodations/${accomSq}`);
  console.log(response);
  return response.data;
};

export const AdminAccomSelectList = async () => {
  const response = await apiAxios.get('/admin/accommodations');
  return response.data;
};
