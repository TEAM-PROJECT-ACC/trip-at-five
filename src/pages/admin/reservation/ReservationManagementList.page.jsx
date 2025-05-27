import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import './ReservationManagementList.style.scss';
import { accomData } from '../../../assets/sample-data/accomSampleData';
const dataList = accomData.accommodation_tb;

const ReservationManagementList = () => {
  const detailPageHandler = () => {
    console.log('예약상세페이지로 이동!');
  };
  return (
    <div className='reservation-management__container'>
      <AdminHeader className='admin-main-header' title='예약관리'>
        <AdminSearch className='admin-search-area__container' placeholder={'숙박업소명 혹은 지역을 입력해주세요'} />
      </AdminHeader>
      <div className='admin-main-body'>
        <table className='admin-table'>
          <thead className='admin-table-header'>
            <tr className='t-head-item'>
              <th className='t-head-item-col col-w-10'>숙소유형</th>
              <th className='t-head-item-col col-w-30'>숙소명</th>
              <th className='t-head-item-col col-w-30'>주소</th>
              <th className='t-head-item-col col-w-20'>전화번호</th>
              <th className='t-head-item-col col-w-10'>최소가</th>
            </tr>
          </thead>
          <tbody className='admin-table-body'>
            {dataList.map((value, idx) => (
              <tr key={idx} className='t-body-item' onClick={() => detailPageHandler(value.accom_sq)}>
                <td className='t-body-item-col'>{value.accom_type}</td>
                <td className='t-body-item-col'>{value.accom_name}</td>
                <td className='t-body-item-col'>{value.accom_location}</td>
                <td className='t-body-item-col'>{value.accom_phone}</td>
                <td className='t-body-item-col'>{value.rooms[0].room_price.toLocaleString('ko-kr')}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 관리자 페이지 네이션 */}
    </div>
  );
};

export default ReservationManagementList;
