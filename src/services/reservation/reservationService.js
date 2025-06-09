import { apiAxios } from '../service';

export const createResCodeAPI = async (resInfo) => {
  console.log('room_sq : ' + resInfo.roomInfo[0].rooms[0].room_sq);
  console.log('resEmail : ' + resInfo.resEmail);
  console.log('accom_name : ' + resInfo.roomInfo[0].accom_name);
  console.log('room_name : ' + resInfo.roomInfo[0].rooms[0].room_name);

  const resCodeData = {
    accomSq: resInfo.roomInfo[0].accom_sq,
    roomSq: resInfo.roomInfo[0].rooms[0].room_sq,
    accomName: resInfo.roomInfo[0].accom_name,
    roomName: resInfo.roomInfo[0].rooms[0].room_name,
    resEmail: resInfo.resEmail,
  };

  console.log(resCodeData);

  /**
   * GET일 경우 params로 데이터 전달!!
   */
  const response = await apiAxios.get(
    '/reservations/code',
    {
      params: resCodeData,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};
