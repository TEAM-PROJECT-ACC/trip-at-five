import { apiAxios } from '../../../../services/service';

// 취소요청 목록 조회
export const reservationCancelList = async ({
  currentPage = 1,
  numOfRows = 10,
  keyword = '',
}) => {
  const response = await apiAxios.get('/admin/reservations/cancel/list', {
    params: { keyword, currentPage, numOfRows },
  });
  return response;
};

// 취소요청 단건 조회
export const selectReservationDetail = async (resCode) => {
  return await apiAxios.get(`/admin/reservations/cancel/detail/${resCode}`);
};

// 결제 취소 요청
export const getPaymentCancel = async (receiptId, resCd) => {
  console.log(receiptId, resCd);
  const response = await apiAxios.post('/payments/cancel', {
    receiptId,
    resCd,
  });

  return response;
};
