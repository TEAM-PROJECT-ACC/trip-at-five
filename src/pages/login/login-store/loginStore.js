import { create } from 'zustand';

const initialState = {
	id: null,
	pwd: null,
	isLogin: false,
	error: ''
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

		setError: (text) =>
		set({
			error: text,
		}),

	reset: () => set(() => ({ ...initialState })),
}));

export default LoginStateStore;
