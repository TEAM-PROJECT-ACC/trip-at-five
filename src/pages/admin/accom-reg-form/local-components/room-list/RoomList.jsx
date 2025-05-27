import React from 'react';
import './RoomList.style.scss';
import { accomData } from '../../../../../assets/sample-data/accomSampleData';

import { BsFillHouseAddFill, FaEdit, MdDelete } from '../../../../../assets/icons/index';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import { useNavigate } from 'react-router-dom';

const roomList = accomData.accommodation_tb[0].rooms;

const RoomList = ({ accomNo }) => {
  const navigate = useNavigate();

  // 객실 등록/수정 페이지 이동 핸들러
  const registerRoomPageHandler = (accomNo) => {
    console.log(accomNo);
    navigate(`/admin/accommodations/${accomNo}/rooms`);
  };
  return (
    <>
      {/* 숙박업소 객실관리(목록) */}
      <div className='room-list__container'>
        <div className='room-list-header'>
          <h2>객실 관리</h2>
          <AdminIconButton onClick={() => registerRoomPageHandler(accomNo)} children={<BsFillHouseAddFill />} />
        </div>
        <div className='room-list'>
          <table className='admin-table'>
            <thead className='admin-table-header'>
              <tr className='t-head-item'>
                <th className='t-head-item-col col-w-10'>객실명</th>
                <th className='t-head-item-col col-w-30'>객실수</th>
                <th className='t-head-item-col col-w-30'>객실가격</th>
                <th className='t-head-item-col col-w-20'>편집</th>
                <th className='t-head-item-col col-w-10'>제거</th>
              </tr>
            </thead>
            <tbody className='admin-table-body'>
              {roomList.map((value, idx) => (
                <tr key={idx} className='t-body-item' onClick={() => registerRoomPageHandler(value.room_sq)}>
                  <td className='t-body-item-col'>{value.room_name}</td>
                  <td className='t-body-item-col'>{value.room_count}</td>
                  <td className='t-body-item-col'>{value.room_price.toLocaleString('ko-kr')}원</td>
                  <td className='t-body-item-col edit-button'>
                    <FaEdit />
                  </td>
                  <td className='t-body-item-col delete-button'>
                    <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RoomList;
