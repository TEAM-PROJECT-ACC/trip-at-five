import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
	isLogin: false,
	error: '',
};

export const loginAccountStore = create(
	persist(
		(set) => ({
			...initialState,
			setIslogin: () =>
				set({
					isLogin: true,
				}),

			setError: (text) =>
				set({
					error: text,
				}),

			resetLoginAccountStore: () => set(() => ({ ...initialState })),
		}),
		{
			name: 'islogin',
		}
	)
);

const snsInitialState = {
	plaform: '',
};

export const loginSnsStateStore = create(
	persist(
		(set) => ({
			...snsInitialState,
			setPlaform: (text) =>
				set({
					plaform: text,
				}),
			resetLoginSnsStateStore: () => set(() => ({ ...snsInitialState })),
		}),
		{
			name: 'login-plaform-Info',
		}
	)
);

/* 로그인한 정보 저장용 */
export const loginStateStore = create(
	persist(
		(set) => ({
			loginInfo: '',
			setLoginInfo: (text) =>
				set({
					loginInfo: text,
				}),
			resetLoginedStateStore: () => set(() => ({ loginInfo: '' })),
		}),
		{
			name: 'userInfo',
		}
	)
);
