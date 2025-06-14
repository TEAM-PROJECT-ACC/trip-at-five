import { useEffect, useState } from 'react';
import AdminTableHead from './table/thead/AdminTableHead.component';
import AdminTableBody from './table/tbody/AdminTableBody.component';
import { AdminPagination } from '../../../../components/admin-pagination/AdminPagination.component';
import './AdminManagementList.style.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminManagementList = ({
  columnList,
  dataList,
  totalCount,
  currentPage,
  numOfRows,
  onClickRow,
  onPageChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryString = location.search;
  const [pageNationProps, setPageNationProps] = useState(() => {
    return {
      className: '',
      totalCount: dataList.length,
      pageLength: 10,
      currentPage: 1,
      numOfRows: 10,
    };
  });

  const handlePagination = (pageNo) => {
    // 상태가 변경된 현재 페이지 번호 : pageNo
    setPageNationProps((prev) => {
      return {
        ...prev,
        currentPage: pageNo,
      };
    });
    navigate(location.pathname + '?currentPage=' + pageNo);
  };

  return (
    <>
      <div className='admin-main-body'>
        <table className='admin-table'>
          <AdminTableHead columnList={columnList} />
          <AdminTableBody
            dataList={dataList}
            onClickRow={onClickRow}
          />
        </table>
      </div>
      <AdminPagination
        className=''
        totalCount={totalCount}
        currentPage={currentPage}
        numOfRows={numOfRows}
        onClick={onPageChange}
        useMoveToEnd
      />
    </>
  );
};

export default AdminManagementList;
