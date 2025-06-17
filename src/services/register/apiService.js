import baseServerAxios from '../Interceptor/Interceptor';

export const emailDuplicationCheck = async (email) => {
  const response = await baseServerAxios.post('/register/emailDuplication', {
    email: email,
  });
  return response;
};

export const sendEmailCode = async (email) => {
  const response = await baseServerAxios.post('/email/send', { email: email });
  return response;
};

export const emailCodeCheck = async (email, code) => {
  const response = await baseServerAxios.post('/email/verify', {
    email: email,
    code: code,
  });
  return response;
};

export const nickNameDuplicationCheck = async (nickName) => {
  const response = await baseServerAxios.post(
    '/register/nickNameDuplicationCheck',
    {
      nickName: nickName,
    }
  );
  return response;
};

export const sendRegister = async (email, pwd, nickName, tel, address) => {
  const response = await baseServerAxios.post('/register/send', {
    email: email,
    pwd: pwd,
    nickName: nickName,
    tel: tel,
    address: address,
  });
  return response;
};
