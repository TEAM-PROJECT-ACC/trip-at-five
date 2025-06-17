import { useMemo } from 'react';
import { Pagination } from '../../../../components';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryProvider } from '../../stores';
import { DiaryItem } from '../diary-item/DiaryItem.component';
import './diaryList.style.scss';
import { classNames } from '../../../../utils';
import { loginStateStore } from '../../../../states/login/loginStore';

export const DiaryList = () => {
  const { loginInfo } = loginStateStore();
  const { pageInfo, diaryList, selectAllList } = useDiaryList();
  const currentPage = useMemo(() => {
    return pageInfo.pageNo;
  }, [pageInfo]);
  console.log(pageInfo);
  // TODO: memNo를 로그인 회원의 memNo로 수정해야 함
  const handleCurrentPage = (pageNo) => {
    if (pageNo !== currentPage) {
      selectAllList({
        memNo: loginInfo.memSq,
        pageNo,
        numOfRows: pageInfo.numOfRows,
      });
    }
  };

  return (
    <>
      <div
        className={classNames(
          'diary-page__diary-list-container',
          !diaryList || diaryList.length === 0 ? 'no-list' : ''
        )}
      >
        {diaryList && diaryList.length > 0 ? (
          <>
            {diaryList.map((diary) => {
              return (
                <DiaryProvider
                  key={diary.diarySq}
                  initialDiary={diary}
                >
                  <DiaryItem initDiary={diary} />
                </DiaryProvider>
              );
            })}
          </>
        ) : (
          <div className='diary-page__no-list-container'>
            아직 작성된 일지가 없습니다.
          </div>
        )}
      </div>
      {diaryList && diaryList.length > 0 && (
        <Pagination
          className='diary-page__pagination'
          totalCount={pageInfo.totalCount}
          currentPage={currentPage}
          onClick={handleCurrentPage}
        />
      )}
    </>
  );
};
