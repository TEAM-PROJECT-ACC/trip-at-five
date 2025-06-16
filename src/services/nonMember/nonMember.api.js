import { apiAxios } from '..';
import { NON_MEMBER_REQUESTS } from './nonMember.requests';

export const selectNonMemberReserve = async ({ resCd }) => {
  console.log(resCd);
  const response = await apiAxios.get(NON_MEMBER_REQUESTS.selectReservation, {
    params: { resCd },
  });

  console.log(response.data);
  return response.data;
};

export const sendEmailCode = async ({ email }) => {
  const response = await apiAxios.post(NON_MEMBER_REQUESTS.sendEmailCode, {
    email,
  });

  return response.data;
};

export const verifyEmailCode = async ({ email, code }) => {
  const response = await apiAxios.post(NON_MEMBER_REQUESTS.verifyEmailCode, {
    email,
    code,
  });

  return response.data;
};
