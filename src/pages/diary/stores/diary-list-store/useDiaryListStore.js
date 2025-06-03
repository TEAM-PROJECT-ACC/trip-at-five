import { create } from 'zustand';
import {
  deleteDiary,
  insertDiary,
  selectAllList,
} from '../../../../services/diary/api';

export const useDiaryListStore = create((set) => ({
  diaryList: [],
  initDiaryList: async ({ memNo, pageNo, numOfRows }) => {
    const initList = await selectAllList({ memNo, pageNo, numOfRows });
    set({ diaryList: initList });
  },
  deleteDiary: async ({ diary, pageNo, numOfRows }) => {
    const deletedList = await deleteDiary({ diary, pageNo, numOfRows });
    set({ diaryList: deletedList });
  },
  insertDiary: async ({ diary, pageNo, numOfRows }) => {
    const insertList = await insertDiary({ diary, pageNo, numOfRows });
    set({ diaryList: insertList });
  },
  resetDiaryList: () => set({ diaryList: [] }),
}));
