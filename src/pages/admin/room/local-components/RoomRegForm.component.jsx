import { useEffect, useRef, useState } from 'react';
import { HttpStatusCode } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';
import AdminPrimaryButton from '../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import './RoomRegForm.style.scss';
import {
  deleteRoomAPI,
  findRoomByAccomNoAndRoomSq,
  insertRoomAPI,
  updateRoomAPI,
} from '../../../../services/room/roomService.api';
import { VITE_SERVER_BASE_URL } from '../../../../../env.config';
import { diffHoursFunc } from './utils/checkInOut.util';
import {
  DELETE_ROOM,
  INSERT_ROOM,
  timeArray,
  toastInfo,
  UPDATE_ROOM,
} from './data/roomRegFrom.constant';
import { FaTrashAlt } from '../../../../assets/icons/index';
import { useModal } from '../../../../hooks';
import { Modal } from '../../../../components';

/**
 *
 * @param {accomId} 숙박업소 PK값. 필수 값이다.
 * @param {roomId} 객실 PK값. 없을 경우 정보 수정이다.
 * @returns
 */
const RoomRegForm = ({ accomId, roomId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 객실데이터 초기 상태
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

  const [word, setWord] = useState('');
  const { isModalOpen, handleModalOpen } = useModal();
  const [roomNameWordCount, setRoomNameWordCount] = useState(0);
  const [checkTime, setCheckTime] = useState(false);
  const [imageFileData, setImageFileData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['roomInfo', accomId, roomId],
    queryFn: async () => {
      // console.log(accomId, roomId);
      const { data } =
        roomId && (await findRoomByAccomNoAndRoomSq(accomId, roomId));
      // console.log(data);
      return data ?? [];
    },
    staleTime: 1000 * 20,
  });

  const checkInRef = useRef();
  const checkOutRef = useRef();

  // tanstack query 적용
  const { mutate } = useMutation({
    mutationKey: ['roomInfo'],
    // mutationFn은 유연성 때문에 오직 단 하나의 매개변수만 받는다.
    mutationFn: async ({ type, updatedRoomData }) => {
      // console.log(type);
      // console.log(updatedRoomData); // 정상출력 확인
      if (type === DELETE_ROOM) {
        const { status } = await deleteRoomAPI({ accomId, roomId });
        // console.log(status);
        if (status !== 200) throw new Error('에러발생');
        return status;
      } else {
        // console.log(formData); // 정상출력 확인

        const formData = new FormData();

        for (const [key, val] of Object.entries(updatedRoomData)) {
          if (key !== 'roomSq' && (val === 0 || val === '')) {
            errorToastAlterFunc(`${key} 비어 있는 항목이 있습니다!`);
            return;
          }
          // console.log(key + ' : ' + val);
          formData.append(key, val);
        }

        if (imageFileData.length > 0) {
          imageFileData.forEach((file) => formData.append('images', file));
        }

        // console.log(Array.from(formData));
        const { status } =
          type === 1
            ? await insertRoomAPI(formData)
            : await updateRoomAPI(formData);

        // console.log(status);
        // console.log(data);
        if (status !== 200) throw new Error('에러발생');
        return status;
      }
    },
    onMutate: async () => {
      // MutationFn이 실행 전에 실행 되는 곳
    },
    onSuccess: (status, variables, context) => {
      // MutationFn이 성공 시 실행 되는 곳
      console.log('onSuccess', status, variables, context);
      // 변이 성공 시 캐시 무효화로 객실 폼 데이터 갱신!
      queryClient.invalidateQueries({ queryKey: ['roomInfo'] });

      if (status === HttpStatusCode.Ok) {
        successToastAlterFunc(
          variables.type === INSERT_ROOM
            ? '등록'
            : variables.type === UPDATE_ROOM
            ? '수정'
            : '삭제'
        );
        setTimeout(
          () => navigate(`/admin/accommodations/${accomId}/edit`),
          2000
        );
      }
    },
    onError: (error, formData, context) => {
      // MutationFn이 실패 시 실행 되는 곳
      console.log('onError', error, formData, context);
      // 변이 실패 시, 낙관적 업데이트 결과를 이전 데이터로 되돌리기!
      if (context) {
        queryClient.setQueryData(['roomInfo'], context.previousUsers);
      }
      errorToastAlterFunc(error);
    },
    retry: 3, // 변이 실패 시 3번 재시도
    retryDelay: 500, // 0.5초 간격으로 재시도
  });

  // 객실 명 글자 수 유효성 검사 핸들러
  const handleWordCount = (e) => {
    let value = e.target.value;

    if (value.length <= 18) {
      setWord(value);
      setRoomNameWordCount(value.length);
    }
  };

  // 체크인/아웃 시간차 유효성 검사 핸들러
  const handleCheckTime = () => {
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;

    diffHoursFunc(checkIn, checkOut);

    const diffHours = diffHoursFunc(checkIn, checkOut);

    // 8시간 이상 21시간 이하
    if (diffHours < 8 || diffHours > 21) {
      setCheckTime(true); // 오류 상태
    } else {
      setCheckTime(false); // 정상 상태
    }
  };

  // 데이터 상태 핸들러
  const handleDataState = (e) => {
    const name = e.target.name;
    const value = ['roomPrice', 'roomStdPpl', 'roomMaxPpl', 'roomCnt'].includes(
      name
    )
      ? Number(e.target.value)
      : e.target.value;

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

  // Modal
  const handleModal = () => {
    handleModalOpen(true);
  };

  // Submit
  const handleSubmitRoom = async (type) => {
    mutate({
      type,
      updatedRoomData: {
        ...roomData,
        roomName: word,
        roomChkIn: checkInRef.current.value,
        roomChkOut: checkOutRef.current.value,
      },
    });
  };

  /**
   * 성공 시 toast 함수
   * @param {*} message
   */
  const successToastAlterFunc = (message) => {
    toast.success(`객실 ${message} 성공!`, toastInfo);
  };

  /**
   * 실패 시 toast 함수
   * @param {*} error
   */
  const errorToastAlterFunc = (error) => {
    toast.error(error, toastInfo);
  };

  useEffect(() => {
    if (data?.roomName) {
      setWord(data.roomName);
      setRoomNameWordCount(data.roomName.length);

      setRoomData(data);
    }
  }, [data]);

  // 디버깅
  // useEffect(() => {
  //   console.log(roomData);
  // }, [roomData]);

  return (
    <>
      {!isLoading && (
        <>
          <div className='room-main-form__container'>
            <div className='room-main-form'>
              <div className='room-main-form-left'>
                <div className='room-main-form-item'>
                  <label className='admin-form-label'>객실명</label>
                  <AdminInput
                    type={'text'}
                    name='roomName'
                    required
                    value={word}
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
                    defaultValue={data.roomPrice}
                    placeholder={'객실 가격을 입력해주세요'}
                    onChange={handleDataState}
                  />
                </div>
                <div className='room-main-form-item'>
                  <label className='admin-form-label'>객실 수</label>
                  <AdminInput
                    type={'number'}
                    name='roomCnt'
                    defaultValue={data.roomCnt}
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
                        name='roomStdPpl'
                        placeholder={'기준인원을 입력해주세요'}
                        defaultValue={data.roomStdPpl}
                        onChange={handleDataState}
                      />
                    </div>
                    <div className='group-item'>
                      <label className='group-item-label'>최대인원</label>
                      <AdminInput
                        type={'number'}
                        name='roomMaxPpl'
                        defaultValue={data.roomMaxPpl}
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
                        defaultValue={data.roomChkIn}
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
                        defaultValue={data.roomChkOut}
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
                      <AdminPrimaryButton
                        className='room-reg-button'
                        onClick={() => handleSubmitRoom(UPDATE_ROOM)}
                      >
                        수정
                      </AdminPrimaryButton>
                      <AdminPrimaryButton
                        className='room-reg-button'
                        // onClick={() => handleSubmitRoom(DELETE_ROOM)}
                        onClick={() => handleModal()}
                      >
                        삭제
                      </AdminPrimaryButton>
                    </>
                  ) : (
                    <AdminPrimaryButton
                      className='room-reg-button'
                      onClick={() => handleSubmitRoom(INSERT_ROOM)}
                    >
                      등록
                    </AdminPrimaryButton>
                  )}
                </div>
              </div>
            </div>

            <div className='room-image-list__container'>
              {data?.imageList && data?.imageList.length > 0 ? (
                data?.imageList.map((value, idx) => {
                  return (
                    <div
                      key={idx}
                      className='room-preview-img'
                    >
                      <img
                        src={`${VITE_SERVER_BASE_URL}${value}`}
                        alt={`객실 이미지 ${idx + 1}`}
                      />
                    </div>
                  );
                })
              ) : (
                <p>등록된 객실 이미지가 없습니다.</p>
              )}
            </div>
            <ToastContainer />
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal
          modalHandler={handleModalOpen}
          className='delete-room-image-modal'
          useCloseIcon={true}
        >
          <div className='delete-room-image-modal-message__container'>
            <span className='delete-room-image-modal-message'>
              객실을 <strong>삭제</strong>하시겠습니까?
            </span>
          </div>
          <button
            className='delete-room-image-modal-button'
            onClick={() => handleSubmitRoom(DELETE_ROOM)}
          >
            <FaTrashAlt />
          </button>
        </Modal>
      )}
    </>
  );
};

export default RoomRegForm;
