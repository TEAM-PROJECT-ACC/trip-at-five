import { useContext } from 'react';
import { DiaryStoreContext } from './diary.context';
import { useStore } from 'zustand';

export const useDiaryStore = () => {
  const store = useContext(DiaryStoreContext);
  return useStore(store);
};

// export const useDiaryStore = create((set) => ({
//   diary: null,
//   setInitDiary: (diary) => set({ diary }),
//   modifyDiary: async (modifiedDiary) => {
//     const modifiedData = await modifyDiary(modifiedDiary);
//     set({ diary: modifiedData });
//   },
// }));
