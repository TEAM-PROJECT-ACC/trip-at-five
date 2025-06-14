import { apiAxios } from '../service';

/**
 * 객실 전체 목록 조회 API (페이징처리 부분 완료 시 이어서 구현 예정)
 * @param {*} accomNo
 * @param {*} currentPage
 * @returns
 */
export const selectRoomListAPI = async (accomNo, currentPage) => {
  currentPage = currentPage === null ? 1 : currentPage;
  // console.log('서버 전달 전 accomNo : ' + accomNo);
  // console.log(currentPage);
  const response = await apiAxios.get(
    `admin/accommodations/${accomNo}/rooms?currentPage=${currentPage}`
  );

  // console.log('서버 response : ' + response.data);

  return response;
};

/**
 * 객실 단건 조회 API
 * @param {*} accomNo
 * @param {*} roomNo
 * @returns
 */
export const findRoomByAccomNoAndRoomSq = async (accomNo, roomNo) => {
  const response = await apiAxios.get(
    `admin/accommodations/${accomNo}/rooms/${roomNo}`
  );
  return response;
};

/**
 * 객실 등록 API
 * @param {*} formData
 * @returns
 */
export const insertRoomAPI = async (formData) => {
  // console.log('숙박업소번호 : ' + formData.get('accomNo'));
  const response = await apiAxios.post(
    `admin/accommodations/${formData.get('accomNo')}/rooms`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

/**
 * 객실 수정 API
 * @param {*} formData
 * @returns
 */
export const updateRoomAPI = async (formData) => {
  const response = await apiAxios.put(
    `admin/accommodations/${formData.get('accomNo')}/rooms`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

/**
 * 객실 삭제 API
 * @param {*} roomIdentify
 * @returns
 */
export const deleteRoomAPI = async (roomIdentify) => {
  const response = await apiAxios.delete(
    `admin/accommodations/${roomIdentify.accomId}/rooms`,
    { data: roomIdentify }
  );
  return response;
};

export const deleteImageAPI = async (accomNo, roomNo, imageList) => {
  const response = await apiAxios.delete(
    `admin/accommodations/${accomNo}/rooms/${roomNo}/images`,
    { data: imageList }
  );

  return response;
};

/**
 * 객실 수 조회
 * @param {*} selectObj : 숙박 번호, 체크인/아웃 날짜
 * @returns
 */
export const selectRoomCnt = async (selectObj) => {
  const response = await apiAxios.get(
    `accommodations/${selectObj.accomNo}/rooms/room-cnt`,
    {
      params: selectObj,
    }
  );

  return response;
};
