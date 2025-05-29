import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './AdminSearch.style.scss';

const AdminSearch = ({ className, placeholder, children }) => {
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
