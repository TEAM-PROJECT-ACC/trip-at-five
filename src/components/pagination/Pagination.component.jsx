import { classNames } from '../../utils/index';
import { PageButton } from './components/page-button/PageButton.component';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from '../../assets/icons/index';
import './pagination.style.scss';
import { PageList } from './components/page-list/PageList.component';

/**
 *
 *
 * @param {
 * totalCount 총 아이템 수
 * pageLength 페이지 단위
 * currentPage 현재 페이지
 * numOfRows 페이지 당 아이템 요청 수
 * useMoveToEnd 시작 페이지 또는 마지막 페이지로 이동 사용 여부
 * }
 * @returns
 */

export const Pagination = ({
  className,
  totalCount,
  pageLength,
  currentPage,
  numOfRows,
  useMoveToEnd,
}) => {
  return (
    <div className={classNames('global-pagination__container', className)}>
      {useMoveToEnd && (
        <PageButton>
          <FaAngleDoubleLeft />
        </PageButton>
      )}
      <PageButton>
        <FaAngleLeft />
      </PageButton>
      <PageList
        totalCount={totalCount}
        pageLength={pageLength}
        currentPage={currentPage}
        numOfRows={numOfRows}
      />
      <PageButton disabled={true}>
        <FaAngleRight />
      </PageButton>
      {useMoveToEnd && (
        <PageButton>
          <FaAngleDoubleRight />
        </PageButton>
      )}
    </div>
  );
};
