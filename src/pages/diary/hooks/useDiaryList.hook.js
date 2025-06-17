import { useEffect } from 'react';
import { useDiaryListStore } from '../stores/diary-list-store/useDiaryListStore';
import { loginStateStore } from '../../../states/login/loginStore';

export const useDiaryList = () => {
  // const [isLoading, setIsLoading] = useState(() => false);
  const { loginInfo } = loginStateStore();
  const { pageInfo, diaryList, selectAllList, deleteDiary, insertDiary } =
    useDiaryListStore();
  console.log(loginInfo);
  useEffect(() => {
    if (!diaryList) {
      selectAllList({
        memNo: loginInfo.memSq,
        pageNo: 1,
        numOfRows: 10,
      });
    }
  }, [diaryList, loginInfo.memSq, selectAllList]);

  useEffect(() => {}, []);

  return {
    // isLoading,
    pageInfo,
    diaryList,
    selectAllList,
    deleteDiary,
    insertDiary,
  };
};
