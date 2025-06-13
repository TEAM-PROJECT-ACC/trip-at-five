import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
	id: '',
	pwd: '',
	isLogin: false,
	error: '',
};

export const loginAccountStore = create((set) => ({
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

	resetLoginAccountStore: () => set(() => ({ ...initialState })),
}));

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
