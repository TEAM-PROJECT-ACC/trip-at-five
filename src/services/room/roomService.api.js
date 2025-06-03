import { apiAxios } from '../service';

/**
 * 객실 전체 목록 조회 API (페이징처리 부분 완료 시 이어서 구현 예정)
 * @param {*} accomNo
 * @param {*} currentPage
 * @returns
 */
export const selectRoomListAPI = async (accomNo, currentPage) => {
  currentPage = currentPage === null ? 1 : currentPage;
  const response = await apiAxios.get(
    `admin/accommodations/${accomNo}/rooms?currentPage=${currentPage}`
  );
  return response;
};

/**
 * 객실 단건 조회 API
 * @param {*} accomNo
 * @param {*} roomNo
 * @returns
 */
export const findRoomByAccomNoAndRoomSq = async (accomNo, roomNo) => {
  console.log(accomNo);
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

  // console.log(response);

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
