import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import './ReservationManagementList.style.scss';
import { accomData } from '../../../assets/sample-data/accomSampleData';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { sampleReservations } from '../../../assets/sample-data/reservation';
const dataList = sampleReservations;

const reservationColumnList = [
  { name: '예약코드', className: 'col-w-10' },
  { name: '숙소명', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-10' },
  { name: '전화번호', className: 'col-w-20' },
  { name: '이메일', className: 'col-w-20' },
  { name: '예약상태', className: 'col-w-10' },
];

const ReservationManagementList = () => {
  const detailPageHandler = () => {
    console.log('예약상세페이지로 이동!');
  };
  return (
    <div className='reservation-management__container'>
      <AdminHeader className='admin-main-header' title='예약관리'>
        <AdminSearch className='admin-search-area__container' placeholder={'숙박업소명 혹은 지역을 입력해주세요'} />
      </AdminHeader>
      <AdminManagementList columnList={reservationColumnList} dataList={dataList} onClickRow={detailPageHandler} />
      {/* 관리자 페이지 네이션 */}
    </div>
  );
};

export default ReservationManagementList;
