import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useIsResetting = create(
	persist(
		(set) => ({
		isTrue: false,
		setIsTrue: () => set({ isTrue: true }),
		setIsFalse: () => set({ isTrue: false }),
	}),
		{
			name: 'pwd-resetting',
		}
)
);
