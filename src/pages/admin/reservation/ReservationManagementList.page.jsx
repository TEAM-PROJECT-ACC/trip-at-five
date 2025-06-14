import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './ReservationManagementList.style.scss';
import { selectReservationList } from './api/reservationList.api';

const reservationColumnList = [
  { name: '예약코드', className: 'col-w-10' },
  { name: '숙소명', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-10' },
  { name: '전화번호', className: 'col-w-20' },
  { name: '이메일', className: 'col-w-20' },
  { name: '예약상태', className: 'col-w-10' },
];

const ReservationManagementList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('currentPage') || '1', 10);

  const [pageInfo, setPageInfo] = useState({
    currentPage,
    numOfRows: 10,
  });

  const { data } = useQuery({
    queryKey: ['adminReservationList', pageInfo],
    queryFn: () => selectReservationList(pageInfo).then((res) => res.data),
    keepPreviousData: true,
  });

  const detailPageHandler = (resCode) => {
    navigate(`/admin/reservations/${resCode}/detail`);
  };

  const handlePagination = (pageNo) => {
    setPageInfo((prev) => ({ ...prev, currentPage: pageNo }));
    navigate(`?currentPage=${pageNo}`);
  };

  return (
    <div className='reservation-management__container'>
      <AdminHeader
        className='admin-main-header'
        title='예약관리'
      >
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'예약코드, 예약자명, 전화번호 중 하나를 입력해주세요'}
        />
      </AdminHeader>
      <AdminManagementList
        columnList={reservationColumnList}
        dataList={data?.dataList || []}
        totalCount={data?.totalCount || 0}
        currentPage={pageInfo.currentPage}
        numOfRows={pageInfo.numOfRows}
        onClickRow={detailPageHandler}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default ReservationManagementList;
