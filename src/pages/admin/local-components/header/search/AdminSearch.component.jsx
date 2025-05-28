import { useNavigate } from 'react-router-dom';
import './AdminSearch.style.scss';
import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import { BsFillHouseAddFill } from '../../../../../assets/icons/index';
import AdminPrimaryButton from '../../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
const AdminSearch = ({ className, placeholder, children }) => {
  const navigate = useNavigate();

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admin/accommodations/new');
  };

  // 검색 핸들러
  const searchHandler = () => {};

  return (
    <div className={className}>
      <div className='admin-search-area'>
        <AdminInput
          className='admin-search'
          placeholder={placeholder}
        />
        <AdminPrimaryButton onClick={searchHandler}>검색</AdminPrimaryButton>
      </div>
      {children}
    </div>
  );
};

export default AdminSearch;
