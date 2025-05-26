import { useNavigate } from 'react-router-dom';
import './AdminSearch.style.scss';
import AdminSearchButton from '../../../../../components/buttons/admin-search-button/AdminSearchButton.component';
import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import { BsFillHouseAddFill } from '../../../../../assets/icons/index';
const AdminSearch = ({ className }) => {
  const navigate = useNavigate();

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admins/accommodations/new');
  };

  // 검색 핸들러
  const searchHandler = () => {};

  return (
    <div className={className}>
      <div className='admin-search-area'>
        <AdminInput className='admin-search' placeholder='숙박업소명 혹은 지역을 입력해주세요' />
        <AdminSearchButton onClick={searchHandler} />
      </div>
      <AdminIconButton onClick={registerPageHandler} children={<BsFillHouseAddFill />} />
    </div>
  );
};

export default AdminSearch;
