import React, { useRef, useState } from 'react';
import './RoomRegForm.style.scss';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import { Select } from '../../../../components';

const timeArray = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const RoomRegForm = () => {
  const [word, setWord] = useState('');
  const [roomNameWordCount, setRoomNameWordCount] = useState(0);

  const checkInRef = useRef();
  const checkOutRef = useRef();

  // 객실 명 글자 수 유효성 검사 핸들러
  const roomNameWordCountHandler = (e) => {
    let value = e.target.value;

    if (value.length <= 18) {
      setWord(value);
      setRoomNameWordCount(value.length);
    }
  };

  // 시간 값을 분 단위로 변환
  const timeChangeMinute = (timeStr) => {
    const hours = timeStr.split(':').map(Number);
    return hours;
  };

  // 체크인/아웃 시간차 21시간 이하 유효성 검사 핸들러
  const checkTimeHandler = () => {
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;

    console.log('CheckIn:', checkIn);
    console.log('CheckOut:', checkOut);

    // 오늘날짜와 내일 날짜를 구한다.
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 내일 날짜

    // 각각 시간을 입력받은 ref 값으로 설정한다
    // 체크인 시간 설정
    const [checkInHour, checkInMin] = timeChangeMinute();
    const checkInDate = new Date(today);
    checkInDate.setHours(checkInHour, checkInMin, 0, 0);

    // 체크아웃 시간 설정
    const [checkOutHour, checkOutMin] = checkOut.split(':').map(Number);
    const checkOutDate = new Date(tomorrow);
    checkOutDate.setHours(checkOutHour, checkOutMin, 0, 0);

    // 두 시간 차이 계산 (밀리초 → 시간으로 변환)
    const diffMs = checkOutDate - checkInDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    console.log('시간 차이:', diffHours, '시간');

    // 유효성 검사
    if (diffHours > 21) {
      console.log('체크인과 체크아웃 시간 차이가 21시간을 초과합니다.');
    } else {
      console.log('체크인/아웃 시간이 유효합니다.');
    }
  };

  return (
    <form className='room-main-form__container' encType='multiple/form-data'>
      <input type='hidden' name='accomNo' value={''} />
      <div className='room-main-form-left'>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>객실명</label>
          <AdminInput type={'text'} name='roomName' value={word} onChange={roomNameWordCountHandler} />
        </div>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>가격 설정</label>
          <AdminInput type={'number'} name='roomPrice' placeholder={'객실 가격을 입력해주세요'} />
        </div>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>객실 수</label>
          <AdminInput type={'number'} name='roomCnt' placeholder={'객실 수를 입력해주세요'} />
        </div>
        <div className='room-main-form-item'>
          <p className='admin-form-label'>인원 설정</p>

          <div className='input-group'>
            <div className='group-item'>
              <label className='group-item-label'>기준인원</label>
              <AdminInput type={'number'} name='roomMaxPpl' placeholder={'기준인원을 입력해주세요'} defaultValue={0} />
            </div>
            <div className='group-item'>
              <label className='group-item-label'>최대인원</label>
              <AdminInput type={'number'} name='roomStdPpl' placeholder={'최대인원을 입력해주세요'} defaultValue={0} />
            </div>
          </div>
        </div>
      </div>
      <div className='room-main-form-right'>
        <div className='room-main-form-item'>
          <p className='admin-form-label'>입/퇴실 시간 설정</p>
          <div className='input-group'>
            <div className='group-item'>
              <label className='group-item-label'>입실시간</label>
              <select className='chk-select' name='roomChkIn' ref={checkInRef} onChange={checkTimeHandler}>
                {timeArray.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className='group-item'>
              <label className='group-item-label'>퇴실시간</label>
              <select className='chk-select' name='roomChkOut' ref={checkOutRef} onChange={checkTimeHandler}>
                {timeArray.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='room-main-form-item'>
          <label className='admin-form-label'>객실 이미지 등록</label>
          <AdminInput type={'file'} multiple name='imageList' />
        </div>
        <AdminPrimaryButton className='room-reg-button'>등록하기</AdminPrimaryButton>
      </div>
    </form>
  );
};

export default RoomRegForm;
