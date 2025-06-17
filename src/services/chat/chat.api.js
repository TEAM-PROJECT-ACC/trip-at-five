import { apiAxios } from '..';
import { CHAT_REQUEST } from './chat.requests';

export const getInitChatRoom = async ({ loginInfo, inqCtgCd, roomNo }) => {
  const { memType } = loginInfo;
  const isAdmin = memType === 'admin';
  const memNo = isAdmin ? loginInfo.adminSq : loginInfo.memSq;
  const userEmail = isAdmin ? loginInfo.adminEmailId : loginInfo.memEmailId;

  const response = await apiAxios.get(
    `${CHAT_REQUEST.initChatRoom}/${memType}/${memNo}`,
    {
      params: {
        loginInfo: JSON.stringify(loginInfo),
        userEmail,
        inqCtgCd,
        roomNo: roomNo || 0,
      },
    }
  );
  return response.data;
};
