import { apiAxios } from '../service';
import { ADMIN_CONTACT_REQUESTS } from './adminContact.requests';

export const selectContactList = async ({
  adminSq,
  loginInfo,
  searchParams,
}) => {
  const response = await apiAxios.get(
    `${ADMIN_CONTACT_REQUESTS.selectContactList}/${adminSq}`,
    {
      params: {
        loginInfo: JSON.stringify(loginInfo),
        searchParams: JSON.stringify(searchParams),
      },
    }
  );
  return response.data;
};
