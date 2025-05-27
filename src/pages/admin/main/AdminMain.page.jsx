import './AdminMain.style.scss';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseAddFill } from '../../../assets/icons/index';
import AdminIconButton from '../../../components/buttons/admin-icon-button/AdminIconButton.component';
import { accomData } from '../../../assets/sample-data/accomSampleData';
const dataList = accomData.accommodation_tb;

const AdminMain = () => {
  const navigate = useNavigate();

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admin/accommodations/new');
  };
  // 수정 페이지 이동 핸들러
  const updatePageHandler = (accomNo) => {
    navigate(`/admin/accommodations/${accomNo}/edit`);
  };
  return (
    <div className='accom-list__container'>
      <AdminHeader className='admin-main-header' title='숙박업소관리'>
        <AdminSearch className='admin-search-area__container' placeholder={'숙박업소명 혹은 지역을 입력해주세요'}>
          <AdminIconButton onClick={registerPageHandler} children={<BsFillHouseAddFill />} />
        </AdminSearch>
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
              <tr key={idx} className='t-body-item' onClick={() => updatePageHandler(value.accom_sq)}>
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

export default AdminMain;
