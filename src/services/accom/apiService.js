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

// 수정
export const updateAdminAccomDetail = async (updatedAccomInfo) => {
  const response = await apiAxios.put(`/admin/accommodations/${updatedAccomInfo.accomSq}/edit`, updatedAccomInfo);
  return response.data;
};

// 삭제
export const deleteAdminAccomDetail = async (accomSq) => {
  const response = await apiAxios.delete(`/admin/accommodations/${accomSq}`);
  return response.data;
};

// 등록
export const createAdminAccom = async (formData) => {
  return apiAxios.post('/admin/accommodations/new', formData);
};