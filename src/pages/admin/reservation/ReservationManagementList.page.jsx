import { useNavigate } from 'react-router-dom';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { sampleReservations } from '../../../assets/sample-data/reservation';
import './ReservationManagementList.style.scss';

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
  const navigate = useNavigate();
  const detailPageHandler = (resCode) => {
    navigate(`/admin/reservations/${resCode}/detail`);
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
        dataList={dataList}
        onClickRow={detailPageHandler}
      />
    </div>
  );
};

export default ReservationManagementList;
