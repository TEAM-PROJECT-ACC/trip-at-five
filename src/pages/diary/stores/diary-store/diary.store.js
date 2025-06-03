import { createStore } from 'zustand';
import { modifyDiary } from '../../../../services/diary/api';

const initialState = {
  diary: null,
};

export const createDiaryStore = (initialDiary) =>
  createStore((set) => ({
    diary: initialDiary,
    actions: {
      modifyDiary: async (modifiedDiary) => {
        const modifiedData = await modifyDiary(modifiedDiary);
        set(() => ({ diary: modifiedData }));
      },
      resetInitialState: () => set(initialState),
    },
  }));
