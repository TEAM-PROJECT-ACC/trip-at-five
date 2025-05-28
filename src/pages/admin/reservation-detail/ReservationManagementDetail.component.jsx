import React, { useEffect } from 'react';
import './ReservationManagementDetail.style.scss';
import AdminInput from '../../../components/inputs/input-admin/AdminInput.component';
import { useParams } from 'react-router-dom';
import { FaRegCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import { MdHourglassTop } from 'react-icons/md';
import AccomFacButton from '../../../components/buttons/admin-fac-button/AccomFacButton.component';

const ReservationManagementDetail = () => {
  const params = useParams();

  const resCode = params.id;

  useEffect(() => {
    console.log(params);
    console.log(resCode);
  }, []);

  return (
    <div className='reservation-detail__container'>
      <div className='reservation-detail-header'>
        <AdminInput className={'reservation-detail-res-code'} defaultValue={resCode} placeholder={resCode} disabled />
        <div className='reservation-state-button-group'>
          <AccomFacButton type='button' title={'예약취소'} icon={<FaTimesCircle />} />
          <AccomFacButton type='button' title={'예약완료'} icon={<FaRegCalendarCheck />} />
          <AccomFacButton type='button' title={'처리중'} icon={<MdHourglassTop />} />
        </div>
      </div>
      <div className='reservation-detail-body'>
        <div className='reservation-detail-body-item'>
          {/* 예약자명, 예약자이메일, 예약자전화번호 */}
          <AdminInput className={'item-w-10'} placeholder={'예약자명'} disabled />
          <AdminInput className={'item-w-30'} placeholder={'예약자이메일'} disabled />
          <AdminInput className={'item-w-20'} placeholder={'예약자전화번호'} disabled />
        </div>
        <div className='reservation-detail-body-item'>
          {/* 숙박업소유형, 숙박업소명, 객실명 */}
          <AdminInput className={'item-w-10'} placeholder={'숙박업소유형'} disabled />
          <AdminInput className={'item-w-50'} placeholder={'숙박업소명'} disabled />
          <AdminInput className={'item-w-40'} placeholder={'객실명'} disabled />
        </div>
        <div className='reservation-detail-body-item'>
          {/* 영수증ID, 결제 상태, 결제수단, 결제가격 */}
          <AdminInput className={'item-w-30'} placeholder={'영수증ID'} disabled />
          <AdminInput className={'item-w-10'} placeholder={'결제수단'} disabled />
          <AdminInput className={'item-w-20'} placeholder={'결제가격'} disabled />
        </div>
      </div>
    </div>
  );
};

export default ReservationManagementDetail;
