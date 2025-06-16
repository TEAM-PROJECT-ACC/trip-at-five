import AdminTableHead from './table/thead/AdminTableHead.component';
import AdminTableBody from './table/tbody/AdminTableBody.component';
import { AdminPagination } from '../../../../components/admin-pagination/AdminPagination.component';
import './AdminManagementList.style.scss';

const AdminManagementList = ({
  columnList,
  dataList = [],
  totalCount = 0,
  currentPage = 1,
  numOfRows = 10,
  onClickRow,
  onPageChange,
  pageLength = 10,
}) => {
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
        pageLength={pageLength}
        currentPage={currentPage}
        numOfRows={numOfRows}
        onClick={onPageChange}
        useMoveToEnd
      />
    </>
  );
};

export default AdminManagementList;
