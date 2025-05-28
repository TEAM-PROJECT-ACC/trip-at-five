import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRegisterStore = create(
	// persist(
		(set) => ({
			step: 1,
			setAddStep: () => set((state) => ({ step: state.step + 1 })),
			setMinusStep: () => set({ step: step - 1 }),
			resetStep: () => set({ step: 1 }),

			isTrue: false,
			setIsTrue: () => set({ isTrue: true }),
			setIsFalse: () => set({ isTrue: false }),
		}),
		{
			name: 'register-step',
		}
	// )
);

const initialState = {
	email: null,
	emailCode: null,
	pwd: null,
	pwdCheck: '',
	nickName: '',
	tel: null,
};

export const RegisterInfoStore = create(
	// persist(
		(set) => ({
			...initialState,
			setEmail: (text) => set({ email: text }),
			setEmailCode: (text) => set({ emailCode: text }),
			setPwd: (text) => set({ pwd: text }),
			setPwdCheck: (text) => set({ pwdCheck: text }),
			setnickName: (text) => set({ nickName: text }),
			setnickNameCheck: (text) => set({ nickCheck: text }),
			setTel: (text) => set({ tel: text }),
			reset: () => set(() => ({ ...initialState })),
		}),
		{
			name: 'register-Info',
		}
	// )
);
