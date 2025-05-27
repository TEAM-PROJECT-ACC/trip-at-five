import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin-header/AdminHeader.component';
import './AdminLayout.style.scss';

const AdminLayout = () => {
  return (
    <>
      {/* 헤더 */}
      <AdminHeader />
      <div className='admin-main__container'>
        <Outlet />
      </div>
      {/* 푸터 */}
    </>
  );
};

export default AdminLayout;
