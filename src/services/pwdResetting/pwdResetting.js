import baseServerAxios from '../Interceptor/Interceptor';

export const updatePwd = async (email, pwd) => {
  const response = await baseServerAxios.put('/users/updatePwd', {
    email: email,
    pwd,
    pwd,
  });
  return response;
};
