import { useState, useEffect } from 'react';
import AdminInput from '../../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './AdminSearch.style.scss';

const AdminSearch = ({ className, placeholder, children, onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [searched, setSearched] = useState(false);

  // 검색 핸들러
  const searchHandler = () => {
    if (keyword.trim() === '') {
      onSearch('', '');
    } else {
      onSearch(keyword, keyword);
    }
    setSearched(true);
  };

  // 검색 이후 && 검색어가 지워졌을 때 전체 데이터 조회
  useEffect(() => {
    if (searched && keyword.trim() === '') {
      onSearch('', '');
      setSearched(false);
    }
  }, [keyword, searched, onSearch]);

  return (
    <div className={className}>
      <div className='admin-search-area'>
        <AdminInput
          className='admin-search'
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <AdminPrimaryButton onClick={searchHandler}>검색</AdminPrimaryButton>
      </div>
      {children}
    </div>
  );
};

export default AdminSearch;
