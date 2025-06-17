import { apiAxios } from '../../../../services/service';

/**
 * 예약 전체 목록 조회 API (프론트에서 페이징)
 * @param {string} keyword
 * @returns
 */
export const selectReservationList = async ({
  keyword = '',
  currentPage = 1,
  numOfRows = 10,
}) => {
  const response = await apiAxios.get('/admin/reservations', {
    params: { keyword, currentPage, numOfRows },
  });
  return response;
};

/**
 * 예약 상세 조회 API
 * @param {*} resNo
 * @returns
 */
export const selectReservationDetail = async (resCode) => {
  const response = await apiAxios.get(`/admin/reservations/${resCode}`);
  // console.log(response);
  return response;
};
