import { useMemo } from 'react';
import { Pagination } from '../../../../components';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryProvider } from '../../stores';
import { DiaryItem } from '../diary-item/DiaryItem.component';
import './diaryList.style.scss';

export const DiaryList = () => {
  const { pageInfo, diaryList, selectAllList } = useDiaryList();
  const currentPage = useMemo(() => {
    return pageInfo.pageNo;
  }, [pageInfo]);

  // TODO: memNo를 로그인 회원의 memNo로 수정해야 함
  const handleCurrentPage = (pageNo) => {
    if (pageNo !== currentPage) {
      selectAllList({ memNo: 2, pageNo, numOfRows: pageInfo.numOfRows });
    }
  };

  return (
    <>
      <div className='diary-page__diary-list-container'>
        {diaryList &&
          diaryList.length > 0 &&
          diaryList.map((diary) => {
            return (
              <DiaryProvider
                key={diary.diarySq}
                initialDiary={diary}
              >
                <DiaryItem initDiary={diary} />
              </DiaryProvider>
            );
          })}
      </div>
      <Pagination
        className='diary-page__pagination'
        totalCount={pageInfo.totalCount}
        currentPage={currentPage}
        onClick={handleCurrentPage}
      />
    </>
  );
};
