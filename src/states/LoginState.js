import { create } from 'zustand';

const LoginStateStore = create((set) => ({
	isLogin: false,
	setIslogin: (text) => set({ isLogin: text }),
}));

export default LoginStateStore;
