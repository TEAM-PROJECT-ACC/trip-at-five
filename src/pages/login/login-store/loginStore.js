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
	code: null,
};

export const LoginSnsStateStore = create((set) => ({
	...snsInitialState,
	setCode: (text) =>
		set({
			code: text,
		}),

	reset: () => set(() => ({ ...snsInitialState })),
}));
