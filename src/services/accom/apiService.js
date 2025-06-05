import { apiAxios } from '..';

export const searchAccommodationByKeyword = async (params) => {
  const response = await apiAxios.get('/accommodations', { params });
  console.log(response);
  return response.data;
};

export const accommodationDetailByAccomSq = async (accomSq) => {
  const response = await apiAxios.get(`/accommodations/${accomSq}`);
  console.log(response);
  return response.data;
};

export const selectAdminAccomList = async (keyword = '') => {
  const response = await apiAxios.get('/admin/accommodations', {
    params: { keyword },
  });
  return response.data;
};

export const selectAdminAcommDetail = async (accomSq) => {
  const response = await apiAxios.get(`/admin/accommodations/${accomSq}/edit`);
  console.log(response.data);
  return response.data;
};
