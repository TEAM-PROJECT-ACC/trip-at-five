import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import './AdminSearch.style.scss';
import AdminPlusButton from '../../../../../components/buttons/admin-plus-button/AdminPlusButton.component';
import AdminSearchButton from '../../../../../components/buttons/admin-search-button/AdminSearchButton.component';

const AdminSearch = ({ className }) => {
  const navigate = useNavigate();

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admins/accommodations');
  };

  // 검색 핸들러
  const searchHandler = () => {};

  return (
    <div className={className}>
      <div className='admin-search-area'>
        <input className='admin-input' placeholder='숙박업소명 혹은 지역을 입력해주세요' />
        <AdminSearchButton onClick={searchHandler} />
      </div>
      <AdminPlusButton onClick={registerPageHandler} />
    </div>
  );
};

export default AdminSearch;
