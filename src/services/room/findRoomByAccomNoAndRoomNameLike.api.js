import { apiAxios } from '../service';

export const findRoomByAccomNoAndRoomNameLike = async (accomNo, keyword) => {
  // console.log(
  //   'findRoomByAccomNoAndRoomNameLike : ' + keyword + ', accomNo: ' + accomNo
  // );

  const response = await apiAxios.get(`admin/accommodations/${accomNo}/rooms`, {
    params: { keyword: keyword },
  });

  return response;
};
