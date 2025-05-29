import { useMemo } from 'react';
import { classNames } from '../../utils/index';
import { AdminPageList } from './components/page-list/AdminPageList.component';
import { AdminPageButton } from './components/page-button/AdminPageButton.component';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from '../../assets/icons/index';
import './AdminPagination.style.scss';

/**
 *
 *
 * @param {
 * className 사용하는 위치에서 스타일 변경 시 전달할 클래스
 * totalCount 총 아이템 수
 * pageLength 페이지 단위
 * currentPage 현재 페이지
 * numOfRows 페이지 당 아이템 요청 수
 * useMoveToEnd 시작 페이지 또는 마지막 페이지로 이동 사용 여부
 * onClick 페이지 번호 넘겨받는 함수 전달
 * }
 * @returns
 */

export const AdminPagination = ({
  className,
  totalCount,
  pageLength,
  currentPage,
  numOfRows,
  useMoveToEnd,
  onClick,
}) => {
  const totalPage = useMemo(
    () => Math.ceil(totalCount / numOfRows),
    [numOfRows, totalCount]
  );

  const handleClick = ({ pageNo }) => {
    if (onClick) {
      onClick(pageNo);
    }
  };

  return (
    <div className={classNames('admin-pagination__container', className)}>
      {useMoveToEnd && (
        <AdminPageButton
          onClick={() => handleClick({ pageNo: 1 })}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </AdminPageButton>
      )}
      <AdminPageButton
        onClick={() => handleClick({ pageNo: currentPage - 1 })}
        disabled={!(currentPage > 1)}
      >
        <FaAngleLeft />
      </AdminPageButton>
      <AdminPageList
        pageLength={pageLength}
        currentPage={currentPage}
        totalPage={totalPage}
        onClick={handleClick}
      />
      <AdminPageButton
        onClick={() => handleClick({ pageNo: currentPage + 1 })}
        disabled={!(currentPage < totalPage)}
      >
        <FaAngleRight />
      </AdminPageButton>
      {useMoveToEnd && (
        <AdminPageButton
          onClick={() => handleClick({ pageNo: totalPage })}
          disabled={currentPage === totalPage}
        >
          <FaAngleDoubleRight />
        </AdminPageButton>
      )}
    </div>
  );
};
