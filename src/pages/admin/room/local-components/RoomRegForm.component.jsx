import { useEffect, useRef, useState } from 'react';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './RoomRegForm.style.scss';
import {
  findRoomByAccomNoAndRoomSq,
  insertRoomAPI,
} from '../../../../services/room/roomService.api';
import { HttpStatusCode } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { imageToFile } from './utils/alternativeImage.util';
import { useQuery } from '@tanstack/react-query';

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

/**
 *
 * @param {accomId} 숙박업소 PK값. 필수 값이다.
 * @param {roomId} 객실 PK값. 없을 경우 정보 수정이다.
 * @returns
 */
const RoomRegForm = ({ accomId, roomId }) => {
  const navigate = useNavigate();

  // 객실데이터 상태
  const [roomData, setRoomData] = useState({
    roomSq: roomId,
    roomName: '',
    roomPrice: 0,
    roomChkIn: '',
    roomChkOut: '',
    roomStdPpl: 0,
    roomMaxPpl: 0,
    roomCnt: 0,
    accomNo: accomId,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['roomInfo', accomId, roomId, roomData],
    queryFn: async () => {
      const { data } =
        roomId && (await findRoomByAccomNoAndRoomSq(accomId, roomId));
      // console.log(data);
      setRoomData(data);
      return data ?? [];
    },
    staleTime: 1000 * 1,
  });

  const [word, setWord] = useState('');
  const [roomNameWordCount, setRoomNameWordCount] = useState(0);
  const [checkTime, setCheckTime] = useState(false);
  const [imageFileData, setImageFileData] = useState([]);

  const checkInRef = useRef();
  const checkOutRef = useRef();

  // 객실 명 글자 수 유효성 검사 핸들러
  const handleWordCount = (e) => {
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

  // 체크인/아웃 시간 설정
  const setTimeFunc = (checkTime) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 내일 날짜

    const [checkHour, checkMin] = timeChangeMinute(checkTime);
    const checkDate = new Date(today);
    checkDate.setHours(checkHour, checkMin, 0, 0);

    return checkDate;
  };

  // 체크인/아웃 시간차 21시간 이하 유효성 검사 핸들러
  const handleCheckTime = () => {
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;

    // 오늘날짜와 내일 날짜를 구한다.
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 내일 날짜

    const checkInDate = setTimeFunc(checkIn);
    const checkOutDate = setTimeFunc(checkOut);

    // 두 시간 차이 계산 (밀리초 → 시간으로 변환)
    const diffMs = checkOutDate - checkInDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    // 유효성 검사
    if (diffHours > 21 || diffHours < 8) {
      setCheckTime(!checkTime);
      return;
    }

    setCheckTime(false);
  };

  // 데이터 상태 핸들러
  const handleDataState = (e) => {
    const name = e.target.name;
    const value = name === 'price' ? Number(e.target.value) : e.target.value;

    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 처리 핸들러
  const handleRoomImage = (e) => {
    const files = Array.from(e.target.files);
    setImageFileData(files);
  };

  // 객실 등록 API 핸들러
  const handleSubmit = async () => {
    const formData = new FormData();

    const updatedRoomData = {
      ...roomData,
      // roomName값 업데이트
      roomName: word,
      // checkIn/Out 값 업데이트
      roomChkIn: checkInRef.current.value,
      roomChkOut: checkOutRef.current.value,
    };

    // updatedRoomData 값 체크
    const checkUpdatedRoomData = Object.entries(updatedRoomData);

    checkUpdatedRoomData.map((value, idx) => {
      if (value[0] !== 'roomSq' && (value[1] === 0 || value[1] === '')) {
        errorToastAlterFunc('비어 있는 항목이 있습니다!');
        return;
      }
    });

    formData.append('roomSq', updatedRoomData.roomSq);
    formData.append('roomName', updatedRoomData.roomName);
    formData.append('roomPrice', updatedRoomData.roomPrice);
    formData.append('roomChkIn', updatedRoomData.roomChkIn);
    formData.append('roomChkOut', updatedRoomData.roomChkOut);
    formData.append('roomStdPpl', updatedRoomData.roomStdPpl);
    formData.append('roomMaxPpl', updatedRoomData.roomMaxPpl);
    formData.append('roomCnt', updatedRoomData.roomCnt);
    formData.append('accomNo', updatedRoomData.accomNo);
    // formData에는 배열을 append 하면 NO!!
    if (imageFileData.length > 0) {
      imageFileData.forEach((file) => {
        formData.append('images', file); // 파일 객체 그대로 append
      });
    } else {
      // 입력받은 이미지가 없을 경우 대체 이미지로 저장
      // const alternativeImagePath =
      //   '/assets/images/alternative-images/alternative-image.png';
      // const fileName = 'alternative-image.png';

      // const file = await imageToFile(alternativeImagePath, fileName);

      // formData.append('images', file);
      formData.append('images', null);
    }

    // 디버깅용
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });

    // 객실 등록 API 호출
    await insertRoomAPI(formData)
      .then((res) => {
        // console.log(res);
        if (res === HttpStatusCode.Ok) {
          successToastAlterFunc();
          setTimeout(() => {
            navigate(`/admin/accommodations/${accomId}/edit`);
          }, 3000);
        }
      })
      .catch((error) => {
        errorToastAlterFunc(error);
      });
  };

  const toastInfo = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const successToastAlterFunc = () => {
    toast.success('객실 등록 성공!', toastInfo);
  };

  const errorToastAlterFunc = (error) => {
    toast.error(error, toastInfo);
  };

  return (
    <>
      {!isLoading && (
        <div className='room-main-form__container'>
          <div className='room-main-form-left'>
            <div className='room-main-form-item'>
              <label className='admin-form-label'>객실명</label>
              <AdminInput
                type={'text'}
                name='roomName'
                required
                value={word ? word : roomData?.roomName}
                onChange={handleWordCount}
              />
              {word.length >= 18 && (
                <span className='check-warning'>
                  글자 수는 최대 <strong>18</strong>자 입니다. (현재{' '}
                  {word.length}
                  자)
                </span>
              )}
            </div>
            <div className='room-main-form-item'>
              <label className='admin-form-label'>가격 설정</label>
              <AdminInput
                type={'number'}
                name='roomPrice'
                defaultValue={roomData?.roomPrice}
                placeholder={'객실 가격을 입력해주세요'}
                onChange={handleDataState}
              />
            </div>
            <div className='room-main-form-item'>
              <label className='admin-form-label'>객실 수</label>
              <AdminInput
                type={'number'}
                name='roomCnt'
                defaultValue={roomData?.roomCnt}
                placeholder={'객실 수를 입력해주세요'}
                onChange={handleDataState}
              />
            </div>
            <div className='room-main-form-item'>
              <p className='admin-form-label'>인원 설정</p>

              <div className='input-group'>
                <div className='group-item'>
                  <label className='group-item-label'>기준인원</label>
                  <AdminInput
                    type={'number'}
                    name='roomMaxPpl'
                    placeholder={'기준인원을 입력해주세요'}
                    defaultValue={roomData?.roomStdPpl}
                    onChange={handleDataState}
                  />
                </div>
                <div className='group-item'>
                  <label className='group-item-label'>최대인원</label>
                  <AdminInput
                    type={'number'}
                    name='roomStdPpl'
                    defaultValue={roomData?.roomMaxPpl}
                    placeholder={'최대인원을 입력해주세요'}
                    onChange={handleDataState}
                  />
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
                  <select
                    className='chk-select'
                    name='roomChkIn'
                    ref={checkInRef}
                    defaultValue={roomData?.roomChkIn}
                    onChange={handleCheckTime}
                  >
                    {timeArray.map((value, idx) => (
                      <option
                        key={idx}
                        value={value}
                      >
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='group-item'>
                  <label className='group-item-label'>퇴실시간</label>
                  <select
                    className='chk-select'
                    name='roomChkOut'
                    ref={checkOutRef}
                    defaultValue={roomData?.roomChkOut}
                    onChange={handleCheckTime}
                  >
                    {timeArray.map((value, idx) => (
                      <option
                        key={idx}
                        value={value}
                      >
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {checkTime && (
                <span className='check-warning'>
                  입/퇴실 시간을 다시 설정해주세요
                </span>
              )}
            </div>
            <div className='room-main-form-item'>
              <label className='admin-form-label'>객실 이미지 등록</label>
              <AdminInput
                type={'file'}
                multiple
                name='imageList'
                onChange={handleRoomImage}
              />
            </div>
            {/* 각 버튼에 따라 다른 메서드 호출 */}
            <div className='room-reg-button-group'>
              {roomId ? (
                <>
                  <AdminPrimaryButton className='room-reg-button'>
                    수정
                  </AdminPrimaryButton>
                  <AdminPrimaryButton className='room-reg-button'>
                    삭제
                  </AdminPrimaryButton>
                </>
              ) : (
                <AdminPrimaryButton
                  className='room-reg-button'
                  onClick={handleSubmit}
                >
                  등록
                </AdminPrimaryButton>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default RoomRegForm;
