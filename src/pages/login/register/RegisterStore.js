import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRegisterStore = create(
	persist(
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
	)
);

export const RegisterInfoStore = create(
	persist(
		(set) => ({
			email: null,
			emailCode: '',
			setEmail: (text) => set({ email: text }),
			setEmailCode: (text) => set({ emailCode: text }),
			pwd: null,
			pwdCheck: '',
			setPwd: (text) => set({ pwd: text }),
			setPwdCheck: (text) => set({ pwdCheck: text }),
			nickName: null,
			setnickName: (text) => set({ nickName: text }),
			nickCheck: false,
			setnickNameCheck: (text) => set({ nickCheck: text }),
			tel: null,
			setTel: (text) => set({ tel: text }),
		}),
		{
			name: 'register-Info',
		}
	)
);
