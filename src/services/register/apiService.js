import baseServrAxios from '../Interceptor/Interceptor';

export const emailDuplicationCheck = async (email) => {
  const response = await baseServrAxios.post('/register/emailDuplication', {
    email: email,
  });
  return response.data;
};

export const sendEmailCode = async (email) => {
  const response = await baseServrAxios.post('/email/send', { email: email });
  return response.data;
};

export const EmailCodeCheck = async (email, code) => {
  const response = await baseServrAxios.post('/email/verify', {
    email: email,
    code: code,
  });
  return response.data;
};

export const nickNameDuplicationCheck = async (nickName) => {
  const response = await baseServrAxios.post(
    '/register/nickNameDuplicationCheck',
    {
      nickName: nickName,
    }
  );
  return response;
};

export const sendRegister = async (email, pwd, nickName, tel, address) => {
  const response = await baseServrAxios.post('/register/send', {
    email: email,
    pwd: pwd,
    nickName: nickName,
    tel: tel,
    address: address,
  });
  return response;
};
