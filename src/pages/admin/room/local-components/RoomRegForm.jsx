import React from 'react';
import './RoomRegForm.style.scss';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';

const RoomRegForm = () => {
  return (
    <form className='room-main-form__container'>
      <div className='room-main-form-left'>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>객실명</label>
          <AdminInput />
        </div>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>가격 설정</label>
          <AdminInput />
        </div>
        <div className='room-main-form-item input-group'>
          <p>인원 설정</p>
          <label className='admin-form-label'>기준인원</label>
          <AdminInput />
          <label className='admin-form-label'>최대인원</label>
          <AdminInput />
        </div>
      </div>
      <div className='room-main-form-right'>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>입실시간</label>
          <AdminInput />
          <label className='admin-form-label'>퇴실시간</label>
          <AdminInput />
        </div>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>객실명</label>
          <AdminInput />
        </div>
        <AdminPrimaryButton className='roomRegBu' />
      </div>
    </form>
  );
};

export default RoomRegForm;
