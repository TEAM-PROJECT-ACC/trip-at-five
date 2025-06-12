import { apiAxios } from '..';

// 클라이언트 숙박 목록
export const searchAccommodationByKeyword = async (params) => {
  const fullParams = {
    ...params,
    locId: params.locId || null,
  };
  const response = await apiAxios.get('/accommodations', {
    params: fullParams,
  });
  return response.data;
};

// 클라이언트 숙박 상세
export const accommodationDetailByAccomSq = async (accomSq) => {
  const response = await apiAxios.get(`/accommodations/${accomSq}`);
  const data = response.data;
  console.log(response);
  data.accomNo = data.accomSq;
  if (data && data.roomList) {
    data.roomList = data.roomList.map((room) => ({
      ...room,
      accomNo: room.accomNo,
    }));
  }

  return data;
};

// 관리자 숙박 목록
export const selectAdminAccomList = async (keyword = '') => {
  const response = await apiAxios.get('/admin/accommodations', {
    params: { keyword },
  });
  return response.data;
};

// 관리자 숙박 상세 페이지
export const selectAdminAcommDetail = async (accomSq) => {
  const response = await apiAxios.get(`/admin/accommodations/${accomSq}/edit`);

  return response.data;
};

// 수정
export const updateAdminAccomDetail = async (id, formData) => {
  const accomSq = id;
  const response = await apiAxios.put(
    `/admin/accommodations/${accomSq}/edit`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

// 삭제
export const deleteAdminAccomDetail = async (accomSq) => {
  const response = await apiAxios.delete(`/admin/accommodations/${accomSq}`);
  return response.data;
};

// 등록
export const createAdminAccom = async (formData) => {
  const response = await apiAxios.post('/admin/accommodations/new', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

// 숙박업소 이미지 삭제
export const deleteAccomImageAPI = async (accomNo, deleteImageList) => {
  const response = await apiAxios.delete(
    `/admin/accommodations/${accomNo}/images`,
    {
      data: deleteImageList,
    }
  );

  return response;
};
