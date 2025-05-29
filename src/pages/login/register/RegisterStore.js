import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const RegisterStepInitialState = {
			step: 1,
			isTrue: false
};


export const useRegisterStore = create(
	persist(
		(set) => ({
			...RegisterStepInitialState,
			setAddStep: () => set((state) => ({ step: state.step + 1 })),
			setMinusStep: () => set({ step: step - 1 }),

			setIsTrue: () => set({ isTrue: true }),
			setIsFalse: () => set({ isTrue: false }),
			reset: () => set(() => ({ ...RegisterStepInitialState })),
		}),
		{
			name: 'register-step',
		}
	)
);

const RegisterInfoInitialState = {
	email: null,
	emailCode: null,
	pwd: null,
	pwdCheck: '',
	nickName: '',
	tel: null,
	address: ''
};

export const RegisterInfostore = create(
	persist(
		(set) => ({
			...RegisterInfoInitialState,
			setEmail: (text) => set({ email: text }),
			setEmailCode: (text) => set({ emailCode: text }),
			setPwd: (text) => set({ pwd: text }),
			setPwdCheck: (text) => set({ pwdCheck: text }),
			setnickName: (text) => set({ nickName: text }),
			setnickNameCheck: (text) => set({ nickCheck: text }),
			setTel: (text) => set({ tel: text }),
			setAddress: (text) => set({ address: text }),
			reset: () => set(() => ({ ...RegisterInfoInitialState })),
		}),
		{
			name: 'register-Info',
		}
	)
);
