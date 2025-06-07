import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  id: null,
  pwd: null,
  isLogin: false,
  error: '',
};

export const LoginStateStore = create((set) => ({
  setId: (text) =>
    set({
      id: text,
    }),

  setPwd: (text) =>
    set({
      pwd: text,
    }),

  setIslogin: (text) =>
    set({
      isLogin: text,
    }),

  setError: (text) =>
    set({
      error: text,
    }),

  reset: () => set(() => ({ ...initialState })),
}));

const snsInitialState = {
  plaform: null,
};

export const LoginSnsStateStore = create(
  persist(
    (set) => ({
      ...snsInitialState,
      setPlaform: (text) =>
        set({
          plaform: text,
        }),
      reset: () => set(() => ({ ...snsInitialState })),
    }),
    {
      name: 'login-plaform-Info',
    }
  )
);
