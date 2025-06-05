import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
  keyword: '',
};

export const useAdminSearchStore = create(
  persist(
    (set) => ({
      initialState,
      setKeywordState: (value) => set({ keyword: value }),
      resetStore: () => set(initialState),
    }),
    {
      name: 'admin-search-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
