import { useEffect } from 'react';
import { useDiaryListStore } from '../stores/diary-list-store/useDiaryListStore';

export const useDiaryList = () => {
  // const [isLoading, setIsLoading] = useState(() => false);
  const { pageInfo, diaryList, selectAllList, deleteDiary, insertDiary } =
    useDiaryListStore();

  useEffect(() => {
    if (!diaryList || diaryList.length === 0) {
      selectAllList({
        memNo: 2,
        pageNo: 1,
        numOfRows: 10,
      });
    }
  }, [diaryList, selectAllList]);

  return {
    // isLoading,
    pageInfo,
    diaryList,
    selectAllList,
    deleteDiary,
    insertDiary,
  };
};
