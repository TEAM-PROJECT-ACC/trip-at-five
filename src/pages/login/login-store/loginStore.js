import { create } from 'zustand';

const initialState = {
	id: null,
	pwd: null,
	isLogin: false,
};

const LoginStateStore = create((set) => ({
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

	reset: () => set(() => ({ ...initialState })),
}));

export default LoginStateStore;
