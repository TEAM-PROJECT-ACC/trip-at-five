import { useMemo } from 'react';
import { PageButton } from '../page-button/PageButton.component';
import './pageList.style.scss';

export const PageList = ({ pageLength, currentPage, totalPage, onClick }) => {
  const pageList = useMemo(() => {
    const list = [];

    const pageDistanceIndex = Math.ceil(pageLength / 2) - 1;

    let startPage = currentPage - pageDistanceIndex;

    if (currentPage >= totalPage - pageDistanceIndex) {
      startPage = totalPage - pageLength + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }
    if (currentPage <= pageDistanceIndex) {
      startPage = 1;
    }

    let endPage = startPage + (pageLength - 1);
    if (endPage >= totalPage) {
      endPage = totalPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (startPage > totalPage) {
        break;
      }
      list.push(i);
    }

    return list;
  }, [currentPage, pageLength, totalPage]);

  return (
    <span className='global-pagination__page-list'>
      {pageList.length > 0 &&
        pageList.map((page, idx) => {
          const selected = page === currentPage;
          return (
            <PageButton
              key={idx}
              selected={selected}
              onClick={() => onClick({ pageNo: page })}
            >
              {page}
            </PageButton>
          );
        })}
    </span>
  );
};
