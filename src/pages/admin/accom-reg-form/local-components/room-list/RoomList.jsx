import React from 'react';
import './RoomList.style.scss';
import { accomData } from '../../../../../assets/sample-data/accomSampleData';
import { BsFillHouseAddFill, FaEdit, MdDelete } from '../../../../../assets/icons/index';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../local-components/header/AdminHeader.component';
import AdminSearch from '../../../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../../../local-components/list/AdminManagementList.component';
import { roomData } from '../../../../../assets/sample-data/roomSampleData';

const roomList = roomData;

const roomColumnList = [
  { name: '객실번호', className: 'col-w-10' },
  { name: '객실명', className: 'col-w-30' },
  { name: '객실수', className: 'col-w-30' },
  { name: '객실가격', className: 'col-w-30' },
];

const RoomList = () => {
  const navigate = useNavigate();

  // 객실 등록 페이지 이동 핸들러
  const roomFormPageHandler = (no, accomNo) => {
    console.log(no);
    console.log(accomNo);
    navigate(`/admin/accommodations/${accomNo ? accomNo : no}/rooms`, { state: { no } });
  };

  return (
    <>
      {/* 숙박업소 객실관리(목록) */}
      <div className='room-list__container'>
        <AdminHeader className='admin-main-header' title='객실관리'>
          <AdminSearch className='admin-search-area__container' placeholder={'객실명을 입력해주세요'}>
            <AdminIconButton onClick={roomFormPageHandler} children={<BsFillHouseAddFill />} />
          </AdminSearch>
          <AdminManagementList columnList={roomColumnList} dataList={roomList} onClickRow={roomFormPageHandler} />
        </AdminHeader>
      </div>
    </>
  );
};

export default RoomList;

/*
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
*/
