import React from 'react';
import './AdminMain.style.scss';
import { BsFillHouseAddFill } from '../../assets/icons/index';

const AdminMain = () => {
  return (
    <div className='admin-main__container'>
      <header className='admin-main-header'>
        <h1>숙박업소관리</h1>
        <div className='admin-search-area__container'>
          <div className='admin-search-area'>
            <input className='admin-input' placeholder='숙박업소명 혹은 지역을 입력해주세요' />
            <button className='search-button'>검색</button>
          </div>
          <div>
            <button className='accom-plus-button'>
              <BsFillHouseAddFill />
            </button>
          </div>
        </div>
      </header>
      <div className='admin-main-body'>
        <table>
          <thead>
            <tr>
              <th>숙소유형</th>
              <th>숙소명</th>
              <th>주소</th>
              <th>전화번호</th>
              <th>최소가</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>숙소유형</td>
              <td>숙소명</td>
              <td>주소</td>
              <td>전화번호</td>
              <td>최소가</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMain;
