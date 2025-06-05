import { useState, useEffect } from 'react';
import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './AdminSearch.style.scss';
import { useAdminSearchStore } from '../../../../../states/admin-search/adminSearchStore';

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
  const { keyword, setKeywordState, resetStore } = useAdminSearchStore(
    (state) => state
  );

  const handleSetKeyword = (e) => {
    // console.log(e.target.value);
    setKeywordState(e.target.value);
  };

  useEffect(() => {
    resetStore(); // 검색 상태 초기화
  }, []);

  return (
    <div className={className}>
      <div className='admin-search-area'>
        <AdminInput
          className='admin-search'
          value={keyword}
          placeholder={placeholder}
          onChange={(e) => handleSetKeyword(e)}
        />
        <AdminPrimaryButton onClick={onClick}>검색</AdminPrimaryButton>
      </div>
      {children}
    </div>
  );
};

export default AdminSearch;
