import { apiAxios } from '../service';

export const createResCodeAPI = async (resUserInfo) => {
  /**
   * GET일 경우 params로 데이터 전달!!
   */
  const response = await apiAxios.post(
    '/reservations/code',
    {
      params: resUserInfo,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

// 사용자 예약 정보 저장
export const insertReservation = async (resUserInfo, roomInfo) => {
  console.log('insertReservation : ' + resUserInfo);
  console.log('insertReservation1 : ' + roomInfo);
  const info = roomInfo.map((value, idx) => value.roomNo);
  console.log('insertReservation2 : ' + info);

  const response = await apiAxios.post('/reservations', {
    resUserInfo: resUserInfo,
    roomInfo: roomInfo,
  });

  console.log('resCode : ' + response.data);

  return response.data;
};

export const bootpayAPI = async (paymentState, resUserInfo, resCode, memNo) => {
  console.log('resCode : ' + resCode);

  // 사용자 예약 정보 저장을 위한 데이터 가공
  resUserInfo = {
    ...resUserInfo,
    resCode: resCode,
    resNumOfPeo: paymentState.numberOfPeople,
    checkInDt: paymentState.checkIn,
    checkOutDt: paymentState.checkOut,
    memNo: memNo,
  };

  // 예약정보 API 호출과 동시에 결과 반환
  return await insertReservation(resUserInfo, paymentState.roomInfo);
};

// 서버 승인
export const requestServerConfirm = async (payment) => {
  console.log('payment : ' + payment);

  const response = await apiAxios.post('/payments/confirm', payment);

  console.log('requestServerConfirm : ' + response);
};
