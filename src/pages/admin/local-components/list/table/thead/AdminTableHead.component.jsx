import React from 'react';

const AdminTableHead = ({ columnList }) => {
  return (
    <thead className='admin-table-header'>
      <tr className='t-head-item'>
        {columnList.map((value, idx) => (
          <th key={idx} className={`t-head-item-col ${value.className}`}>
            {value.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default AdminTableHead;
