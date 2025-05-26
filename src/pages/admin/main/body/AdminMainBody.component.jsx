import React from 'react';
import './AdminMainBody.style.scss';
import { accomData } from '../../../../assets/sample-data/accomSampleData';

const dataList = accomData.accommodation_tb;

const AdminMainBody = ({ className }) => {
  // 수정 페이지 이동 핸들러
  const updatePageHandler = () => {};

  return (
    <div className={className}>
      <table className='admin-table'>
        <thead className='admin-table-header'>
          <tr className='t-head-item'>
            <th className='t-head-item-col col-w-10'>숙소유형</th>
            <th className='t-head-item-col col-w-30'>숙소명</th>
            <th className='t-head-item-col col-w-30'>주소</th>
            <th className='t-head-item-col col-w-20'>전화번호</th>
            <th className='t-head-item-col col-w-10'>최소가</th>
          </tr>
        </thead>
        <tbody className='admin-table-body'>
          {dataList.map((value, idx) => (
            <tr key={idx} className='t-body-item' onClick={updatePageHandler(value.accom_sq)}>
              <td className='t-body-item-col'>{value.accom_type}</td>
              <td className='t-body-item-col'>{value.accom_name}</td>
              <td className='t-body-item-col'>{value.accom_location}</td>
              <td className='t-body-item-col'>{value.accom_phone}</td>
              <td className='t-body-item-col'>{value.rooms[0].room_price.toLocaleString('ko-kr')}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMainBody;
