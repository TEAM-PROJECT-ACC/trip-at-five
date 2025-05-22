import { useEffect, useMemo } from 'react';
import { PageButton } from '../page-button/PageButton.component';
import './pageList.style.scss';

export const PageList = ({
  totalCount,
  pageLength,
  currentPage,
  numOfRows,
}) => {
  const pageList = useMemo(() => {
    const list = [];
    const totalPage = Math.ceil(totalCount / numOfRows);
    const pageDistanceIndex = Math.ceil(pageLength / 2) - 1;

    let startPage = currentPage - pageDistanceIndex;
    if (currentPage >= totalPage - pageDistanceIndex) {
      startPage = totalPage - pageLength;
      if (startPage < 0) {
        startPage = 0;
      }
    }
    if (currentPage < pageDistanceIndex) {
      startPage = 0;
    }

    // endPage가 totalPage보다 커질 수 있음
    let endPage = startPage + (pageLength - 1);
    if (endPage > totalPage) {
      endPage = totalPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (startPage >= totalPage) {
        break;
      }
      list.push(i);
    }

    return list;
  }, [currentPage, numOfRows, pageLength, totalCount]);

  useEffect(() => {
    // NOTI: 테스트 후 삭제
    console.log(pageList);
  }, [pageList]);

  return (
    <span className='global-pagination__page-list'>
      {pageList.length > 0 &&
        pageList.map((page, idx) => {
          const selected = page === currentPage;
          return (
            <PageButton
              key={idx}
              selected={selected}
            >
              {page}
            </PageButton>
          );
        })}
    </span>
  );
};
