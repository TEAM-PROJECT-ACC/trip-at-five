import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin-header/AdminHeader.component';
import './AdminLayout.style.scss';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className='admin-main__container'>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
