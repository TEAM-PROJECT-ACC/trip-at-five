import { useState } from 'react';
import AdminTableHead from './table/thead/AdminTableHead.component';
import AdminTableBody from './table/tbody/AdminTableBody.component';
import { AdminPagination } from '../../../../components/admin-pagination/AdminPagination.component';
import './AdminManagementList.style.scss';

const AdminManagementList = ({ columnList, dataList, onClickRow }) => {
  const [pageNationProps, setPageNationProps] = useState(() => {
    return {
      className: '',
      totalCount: 150,
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
      {/* 관리자 페이지 네이션 */}
      <AdminPagination
        onClick={handlePagination}
        useMoveToEnd
        {...pageNationProps}
      />
    </>
  );
};

export default AdminManagementList;
