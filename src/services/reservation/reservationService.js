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
