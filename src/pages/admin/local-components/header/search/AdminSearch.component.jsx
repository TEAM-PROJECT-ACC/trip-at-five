import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './AdminSearch.style.scss';

/**
 * 검색창 공통 컴포넌트
 * @param className 클래스명
 * @param placeholder input placeholder
 * @param children 검색창 외 컴포넌트
 * @param onClick 검색핸들러
 *
 * @returns
 */
const AdminSearch = ({ className, placeholder, children, onClick }) => {
  return (
    <div className={className}>
      <div className='admin-search-area'>
        <AdminInput
          className='admin-search'
          placeholder={placeholder}
        />
        <AdminPrimaryButton onClick={onClick}>검색</AdminPrimaryButton>
      </div>
      {children}
    </div>
  );
};

export default AdminSearch;
