import React from 'react';
import AdminSearch from './search/AdminSearch.component';
import './AdminMainHeader.style.scss';
import AdminHeaderTitle from '../../../../components/admin-header-title/AdminHeaderTitle.component';

const AdminMainHeader = ({ className }) => {
  return (
    <header className={className}>
      <AdminHeaderTitle title={'숙박업소관리'} />
      <AdminSearch className='admin-search-area__container' />
    </header>
  );
};

export default AdminMainHeader;
