import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.style.scss';

const AdminLayout = () => {
  return (
    <div className='admin-main__container'>
      {/* 대시보드 */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
