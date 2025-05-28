import React, { useEffect, useState } from 'react';
import './AdminManagementList.style.scss';
import AdminTableHead from './table/thead/AdminTableHead.component';
import AdminTableBody from './table/tbody/AdminTableBody.component';

const AdminManagementList = ({ columnList, dataList, onClickRow }) => {
  return (
    <div className='admin-main-body'>
      <table className='admin-table'>
        <AdminTableHead columnList={columnList} />
        <AdminTableBody
          dataList={dataList}
          onClickRow={onClickRow}
        />
      </table>
    </div>
  );
};

export default AdminManagementList;
