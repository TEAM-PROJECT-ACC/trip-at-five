import { useEffect } from 'react';
import { modifyDiary, selectDiary } from '../../../services/diary/api';
import { useDiaryStore } from '../stores/diary-store/useDiaryStore';

/**
 *
 * @param {
 * diary: {
 *    memNo 작성한 회원 번호
 *    diarySq 일지 번호
 *    diaryTitle 일지 제목
 *    diaryCont 일지 내용
 *    diaryRegDt 일지 작성일
 * }}
 * @returns {
 * diaryState
 * handleDiaryState 수정 state
 * handleReadDiary 조회
 * handleModifiedDiary 수정 api
 * }
 */
export const useDiaryState = (initDiary) => {
  const { diary, setInitDiary } = useDiaryStore();

  // const handleDiaryState = (newState) => {
  //   setDiaryState((prev) => {
  //     return {
  //       ...prev,
  //       ...newState,
  //     };
  //   });
  // };

  const handleReadDiary = async ({ memNo, diarySq }) => {
    const newState = await selectDiary({ memNo, diarySq });
    // handleDiaryState(newState);
  };

  const handleModifiedDiary = async ({ diaryTitle, diaryCont }) => {
    const newState = await modifyDiary({ diaryTitle, diaryCont });
    // handleDiaryState(newState);
  };

  useEffect(() => {
    console.log(initDiary);
    if (initDiary) {
      setInitDiary(initDiary);
    }
  }, [initDiary, setInitDiary]);

  return {
    // diaryState,
    // handleDiaryState,
    diary,
    handleReadDiary,
    handleModifiedDiary,
  };
};
