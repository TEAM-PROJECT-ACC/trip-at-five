import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useIsResetting = create(
	persist(
		(set) => ({
			isTrue: false,
			setIsTrue: () => set({ isTrue: true }),
			setIsFalse: () => set({ isTrue: false }),
			resetIsTrue: () => set({ isTrue: false }),
		}),
		{
			name: 'pwd-resetting',
		}
	)
);

const initialState = {
	email: '',
	pwd: '',
};

export const useResettingInfo = create(
	persist(
		(set) => ({
			...initialState,

			setEmail: (test) => set({ email: test }),
			setPwd: (test) => set({ pwd: test }),

			resetResettingInfo: () => set({ ...initialState }),
		}),
		{
			name: 'pwdResettingInfo',
		}
	)
);
