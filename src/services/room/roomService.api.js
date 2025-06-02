import axios from 'axios';
import { apiAxios } from '../service';

const getRoomPath = (accomNo, currentPage) => {
  return currentPage === null
    ? `admin/accommodations/${accomNo}/rooms`
    : `admin/accommodations/${accomNo}/rooms?currentPage=${currentPage}`;
};

/**
 * 객실 전체 목록 조회 API (페이징처리 부분 완료 시 이어서 구현 예정)
 * @param {*} accomNo
 * @param {*} currentPage
 * @returns
 */
export const selectRoomListAPI = async (accomNo, currentPage) => {
  // console.log('selectRoomListAPI : ' + accomNo + ' : ' + currentPage);
  // const response = await apiAxios.get(getRoomPath(accomNo)); // 숙박업소 기능 구현 완료 후 주석 코드로 변경

  currentPage = currentPage === null ? 1 : currentPage;
  const response = await apiAxios.get(getRoomPath(2757748, currentPage)); // 임시 더마루 숙박업소번호값

  // console.log(response.data);

  return response;
};

export const findRoomByAccomNoAndRoomSq = async (accomNo, roomNo) => {
  const response = await apiAxios.get(
    getRoomPath(accomNo, null) + `/${roomNo}`
  );
  // console.log(response.data);
  return response;
};

/**
 * 객실 등록 API
 * @param {*} formData
 * @returns
 */
export const insertRoomAPI = async (formData) => {
  const response = await apiAxios.post(
    getRoomPath(formData.get('accomNo')),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  // console.log(response);
  return response.status;
};
