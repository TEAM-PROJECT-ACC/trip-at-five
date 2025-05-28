import React from 'react';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import './ReservationCancelList.style.scss';
import { useNavigate } from 'react-router-dom';
import { cancelData } from '../../../assets/sample-data/cancelReservationSampleData';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
const dataList = cancelData;

const cancelReservationColumnList = [
  { name: '예약코드', className: 'col-w-20' },
  { name: '영수증ID', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-20' },
  { name: '결제수단', className: 'col-w-10' },
  { name: '결제상태', className: 'col-w-20' },
];

const ReservationCancelList = () => {
  const navigate = useNavigate();
  const detailPageHandler = (resCode) => {
    console.log('예약상세페이지로 이동!');
    console.log(resCode);
    navigate(`/admin/reservations/${resCode}/detail`);
  };
  return (
    <div className='reservation-cancel__container'>
      <AdminHeader className='admin-main-header' title='예약취소요청'>
        <AdminSearch className='admin-search-area__container' placeholder={'예약코드 혹은 예약자명을 입력해주세요'} />
      </AdminHeader>
      <AdminManagementList columnList={cancelReservationColumnList} dataList={dataList} onClickRow={detailPageHandler} />
    </div>
  );
};

export default ReservationCancelList;
