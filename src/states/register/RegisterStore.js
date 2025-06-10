import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
	step: 1,
	isTrue: false,
	emailDuplication: false,
	isType: false,
	email: null,
	emailCode: null,
	pwd: null,
	pwdCheck: null,
	nickName: null,
	nickNameCheck: false,
	tel: '',
	address: '',
};

export const useRegisterStore = create(
	persist(
		(set) => ({
			...initialState,
			setAddStep: () => set((state) => ({ step: state.step + 1 })),
			setMinusStep: () => set({ step: step - 1 }),

			setIsTrue: () => set({ isTrue: true }),
			setIsFalse: () => set({ isTrue: false }),

			setEmailDuplicationTrue: () => set({ emailDuplication: true }),
			setEmailDuplicationFalse: () => set({ emailDuplication: false }),

			setTypeTrue: () => set({ type: true }),
			setTypeFalse: () => set({ type: false }),

			resetRegisterStore: () => set(() => ({ ...initialState })),
		}),
		{
			name: 'register-step',
		}
	)
);

export const useRegisterInfostore = create(
	persist(
		(set) => ({
			...initialState,
			setEmail: (text) => set({ email: text }),
			setEmailCode: (text) => set({ emailCode: text }),
			setPwd: (text) => set({ pwd: text }),
			setPwdCheck: (text) => set({ pwdCheck: text }),
			setNickName: (text) => set({ nickName: text }),
			setNickNameCheckTrue: () => set({ nickNameCheck: true }),
			setNickNameCheckFalse: () => set({ nickNameCheck: false }),
			setTel: (text) => set({ tel: text }),
			setAddress: (text) => set({ address: text }),
			resetRegisterInfoStore: () => set(() => ({ ...initialState })),
		}),
		{
			name: 'register-Info',
		}
	)
);
