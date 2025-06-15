import baseServerAxios from '../Interceptor/Interceptor';

/* 회원 정보 수정 */
export const userInfoUpdate = async (userUpdateTest) => {
  const response = await baseServerAxios.put(
    '/users/infoUpdate',
    userUpdateTest
  );
  return response;
};

/* 회원 비활성화 */
export const userInactive = async (userInfo, pwd) => {
  const response = await baseServerAxios.put('/users/userInactive', {
    email: userInfo,
    pwd: pwd,
  });
  return response;
};

/* 회원 챌린지 정보 조회 */
export const challengeSelect = async (userMemSq) => {
  const response = await baseServerAxios.get(
    `/users/challenge?userMemSq=${userMemSq}`
  );
  return response;
};

/* 회원 예약 조회 */
export const reservationSelect = async (userMemSq) => {
  const response = await baseServerAxios.get(
    `/users/reservationSelect?userMemSq=${userMemSq}`
  );
  return response;
};

export const reservationCancelUpdate = async (resInfo) => {
  const response = await baseServerAxios.put(
    `/users/reservationCancelUpdate`,
    resInfo
  );
  return response;
};

/* 회원 챌린지 완료 수정 */
export const challengeSucces = async (memSq, chalHistoryNo) => {
  const response = await baseServerAxios.put(`/users/challengeSuccess`, {
    memSq: memSq,
    chalHistoryNo: chalHistoryNo,
  });
  return response;
};

/* 회원 쿠폰 정보 조회 */
export const couponSelect = async (userMemSq) => {
  const response = await baseServerAxios.get(
    `/users/couponSelect?userMemSq=${userMemSq}`
  );
  return response;
};
