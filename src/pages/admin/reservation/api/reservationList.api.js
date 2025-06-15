import { apiAxios } from '../../../../services/service';

/**
 * 예약 조회 API
 * @param {*} 조회 정보
 * @returns
 */
export const selectReservationList = async ({
  currentPage = 1,
  numOfRows = 10,
  keyword = '',
}) => {
  const params = { currentPage, numOfRows };
  if (keyword && keyword.trim().length > 0) {
    params.keyword = keyword;
  }
  const response = await apiAxios.get(`/admin/reservations`, { params });
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
