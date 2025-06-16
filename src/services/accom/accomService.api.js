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
export async function accommodationDetailByAccomSq(accomSq, memNo) {
  let url = `/accommodations/${accomSq}`;
  if (memNo !== undefined && memNo !== null) url += `?memNo=${memNo}`;
  return apiAxios.get(url).then((res) => res.data);
}

// 관리자 숙박 목록
export const selectAdminAccomList = async (
  keyword = '',
  pageNo = 1,      // ## 1. 파라미터 이름을 currentPage -> pageNo 로 수정 ##
  numOfRows = 10
) => {
  const response = await apiAxios.get('/admin/accommodations', {
    params: { 
      keyword, 
      pageNo,      // ## 2. 백엔드로 보낼 파라미터 이름도 pageNo 로 수정 ##
      numOfRows 
    },
  });
  console.log(response); // 디버깅용 로그는 그대로 두셔도 됩니다.
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
