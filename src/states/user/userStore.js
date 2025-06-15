/* 회원정보 수정시 사용되는 스토어 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  email: '',
  emailCode: '',
  isEmailCodeCheck: false,
  pwd: '',
  pwdCheck: '',
  nickName: '',
  error: '',
};

export const useUserInfoUpdateStore = create(
  persist(
    (set) => ({
      ...initialState,
      setEmail: (text) =>
        set({
          email: text,
        }),
      setEmailCode: (text) =>
        set({
          emailCode: text,
        }),
      setPwd: (text) =>
        set({
          pwd: text,
        }),
      setPwdCheck: (text) =>
        set({
          pwdCheck: text,
        }),
      setNickName: (text) =>
        set({
          nickName: text,
        }),
      setIsEmailCodeCheckeTrue: () =>
        set({
          isEmailCodeCheck: true,
        }),

      resetUserInfoUpdateStore: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'userInfoUpdate',
    }
  )
);
