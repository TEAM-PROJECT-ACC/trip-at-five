import { create } from 'zustand';
import {
  deleteDiary,
  insertDiary,
  selectAllList,
} from '../../../../services/diary/diary.api';

const initialState = {
  pageInfo: {
    totalCount: 0,
    pageNo: 1,
    numOfRows: 10,
  },
  diaryList: null,
};

export const useDiaryListStore = create((set) => ({
  ...initialState,
  selectAllList: async ({ memNo, pageNo, numOfRows }) => {
    const data = await selectAllList({ memNo, pageNo, numOfRows });
    set({ pageInfo: data.pageInfo, diaryList: data.diaryList });
  },
  deleteDiary: async ({ diary, pageNo, numOfRows }) => {
    const data = await deleteDiary({ diary, pageNo, numOfRows });
    set({ pageInfo: data.pageInfo, diaryList: data.diaryList });
  },
  insertDiary: async ({ diary, pageNo, numOfRows }) => {
    const data = await insertDiary({ diary, pageNo, numOfRows });
    set({ pageInfo: data.pageInfo, diaryList: data.diaryList });
  },
  resetDiaryList: () => set(initialState),
}));
