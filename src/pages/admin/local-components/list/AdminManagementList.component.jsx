import { useEffect, useState } from 'react';
import AdminTableHead from './table/thead/AdminTableHead.component';
import AdminTableBody from './table/tbody/AdminTableBody.component';
import { AdminPagination } from '../../../../components/admin-pagination/AdminPagination.component';
import './AdminManagementList.style.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminManagementList = ({ columnList, dataList, onClickRow }) => {
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

  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    setPageNationProps((prev) => ({
      ...prev,
      totalCount: dataList.length,
    }));

    const startIdx =
      (pageNationProps.currentPage - 1) * pageNationProps.pageLength;
    const endIdx = startIdx + pageNationProps.pageLength;
    setDisplayData(dataList.slice(startIdx, endIdx));
  }, [dataList, pageNationProps.currentPage, pageNationProps.pageLength]);

  return (
    <>
      <div className='admin-main-body'>
        <table className='admin-table'>
          <AdminTableHead columnList={columnList} />
          <AdminTableBody
            dataList={displayData}
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
