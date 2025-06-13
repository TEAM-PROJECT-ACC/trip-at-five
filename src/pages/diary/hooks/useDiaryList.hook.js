import { useEffect } from 'react';
import { useDiaryListStore } from '../stores/diary-list-store/useDiaryListStore';

export const useDiaryList = () => {
  // const [isLoading, setIsLoading] = useState(() => false);
<<<<<<< HEAD
  const { diaryList, initDiaryList, deleteDiary, insertDiary } =
=======
  const { pageInfo, diaryList, selectAllList, deleteDiary, insertDiary } =
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
    useDiaryListStore();

  useEffect(() => {
    if (!diaryList || diaryList.length === 0) {
<<<<<<< HEAD
      initDiaryList({
        memNo: 23,
=======
      selectAllList({
        memNo: 2,
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
        pageNo: 1,
        numOfRows: 10,
      });
    }
<<<<<<< HEAD
  }, [diaryList, initDiaryList]);

  return {
    // isLoading,
    diaryList,
=======
  }, [diaryList, selectAllList]);

  return {
    // isLoading,
    pageInfo,
    diaryList,
    selectAllList,
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
    deleteDiary,
    insertDiary,
  };
};
