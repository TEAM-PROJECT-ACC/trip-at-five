import { useEffect } from 'react';
import { useDiaryListStore } from '../stores/diary-list-store/useDiaryListStore';

export const useDiaryList = () => {
  // const [isLoading, setIsLoading] = useState(() => false);
  const { diaryList, initDiaryList, deleteDiary, insertDiary } =
    useDiaryListStore();

  useEffect(() => {
    if (!diaryList || diaryList.length === 0) {
      initDiaryList({
        memNo: 23,
        pageNo: 1,
        numOfRows: 10,
      });
    }
  }, [diaryList, initDiaryList]);

  return {
    // isLoading,
    diaryList,
    deleteDiary,
    insertDiary,
  };
};
