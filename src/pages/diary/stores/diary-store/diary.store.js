import { createStore } from 'zustand';
<<<<<<< HEAD
import { modifyDiary } from '../../../../services/diary/api';
=======
import { modifyDiary } from '../../../../services/diary/diary.api';
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6

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
