import { create } from 'zustand';
import {
  deleteDiary,
  insertDiary,
  selectAllList,
<<<<<<< HEAD
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
=======
} from '../../../../services/diary/diary.api';

const initialState = {
  pageInfo: {
    totalCount: 0,
    pageNo: 1,
    numOfRows: 10,
  },
  dataList: [],
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
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
}));
