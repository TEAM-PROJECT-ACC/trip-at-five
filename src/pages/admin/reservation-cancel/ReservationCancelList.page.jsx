import React, { useState } from 'react';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import './ReservationCancelList.style.scss';
import { cancelData } from '../../../assets/sample-data/cancelReservationSampleData';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { useModal } from '../../../hooks';
import { Modal } from '../../../components';
const dataList = cancelData;

const cancelReservationColumnList = [
  { name: '예약코드', className: 'col-w-20' },
  { name: '영수증ID', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-20' },
  { name: '결제수단', className: 'col-w-10' },
  { name: '결제상태', className: 'col-w-20' },
];

const ReservationCancelList = () => {
  const { isModalOpen, handleModalOpen } = useModal();
  const [modalResCode, setModalResCode] = useState('');

  const modalHandler = (resCode) => {
    setModalResCode(resCode);
    handleModalOpen(true);
  };

  const cancelResHandler = () => {
    // 예약취소 핸들러
  };

  return (
    <div className='reservation-cancel__container'>
      <AdminHeader className='admin-main-header' title='예약취소요청'>
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'예약코드 혹은 예약자명을 입력해주세요'}
        />
      </AdminHeader>
      <AdminManagementList
        columnList={cancelReservationColumnList}
        dataList={dataList}
        onClickRow={modalHandler}
      />

      {isModalOpen && (
        <Modal modalHandler={handleModalOpen}>
          <div className='reservation-cancel-modal'>
            <div className='reservation-cancel-header'>
              <h1 className='res-code'>{modalResCode}</h1>
              <span>상세</span>
            </div>
            <hr />
            <div className='reservation-cancel-body'>
              <section className='reservation-cancel-item '>
                <h3>사용자이메일</h3>
                <h3>예약자명</h3>
                <h3>전화번호</h3>
                <h3>인원수</h3>
                <h3>CheckIn</h3>
                <h3>CheckOut</h3>
                <h3>예약일</h3>
                <h3>숙박업소번호</h3>
                <h3>객실번호</h3>
              </section>
              <section className='reservation-cancel-item'>
                <h3>asd@asd.com</h3>
                <h3>임성준</h3>
                <h3>010-1234-1234</h3>
                <h3>2</h3>
                <h3>2025년 05월 28일</h3>
                <h3>2025년 05월 30일</h3>
                <h3>2025년 05월 10일</h3>
                <h3>1</h3>
                <h3>2</h3>
              </section>
            </div>
            <button
              className='reservation-cancel-button'
              onClick={cancelResHandler}
            >
              예약취소
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReservationCancelList;
