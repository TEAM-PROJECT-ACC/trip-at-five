import React, { useState, useEffect, useRef } from 'react';
import { getIconsFromRoomInfo } from './roomIconMap';
import { useAccomCartStore } from '../../../../states/accom-cart/accomCartStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './roomList.style.scss';
import {
  GrCart,
  FaHotTub,
  FaBath,
  MdLocalBar,
  MdOutlineRssFeed,
  MdAcUnit,
  FaPumpSoap,
  MdShower,
  FaPlug,
} from '../../../../assets/icons/ys/index';
import { Button } from '../../../../components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import {
  deleteCartItem,
  insertCartItem,
} from '../../../../services/cart/cartService.api';
import { useAccomSearchStore, usePaymentInfoStore } from '../../../../states';
import { loginStateStore } from '../../../../states/login/loginStore';
import { VITE_SERVER_BASE_URL } from '../../../../../env.config';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRoomCnt } from '../../../../services/room/roomService.api';
import { getRoomCnt } from './util/roomList.util';

const roomFacilities = [
  { icon: <FaHotTub />, label: '스파/월풀' },
  { icon: <FaBath />, label: '객실스파' },
  { icon: <MdLocalBar />, label: '미니바' },
  { icon: <MdOutlineRssFeed />, label: '무선인터넷' },
  { icon: <MdAcUnit />, label: '에어컨' },
  { icon: <FaPumpSoap />, label: '욕실용품' },
  { icon: <MdShower />, label: '샤워실' },
  { icon: <FaPlug />, label: '개인콘센트' },
];

const renderIcons = (selectedFacilities) =>
  roomFacilities
    .filter((fac) => selectedFacilities.includes(fac.label))
    .map(({ icon, label }) => (
      <div
        key={label}
        className='room-icon'
        title={label}
      >
        {icon}
      </div>
    ));

const RoomList = ({ accomName, rooms = [], selectedFacilities = [] }) => {
  const navigate = useNavigate();
  const { id: accomNo } = useParams(); // 숙박번호 값
  const timeoutRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const { checkIn, checkOut, numberOfPeople } = useAccomSearchStore(
    (state) => state
  );

  const { selectedItems, removedItems } = useAccomCartStore((state) => state);
  const { resetSelectedCart, resetRemovedCart, toggleItem } =
    useAccomCartStore();
  const { setRoomInfo, setEmailState } = usePaymentInfoStore(
    (state) => state.actions
  );

  const memNo = loginStateStore((state) => state.loginInfo.memSq);

  // 객실 수 조회
  const {
    data: roomCntList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['roomCnt', accomNo, checkIn, checkOut],
    queryFn: async () => {
      const selectObj = {
        accomNo,
        checkInDt: checkIn.slice(0, 10).replace(/\./g, '-'), // 2025-06-14 형태로 변경
        checkOutDt: checkOut.slice(0, 10).replace(/\./g, '-'),
      };
      // console.log(JSON.stringify(selectObj));
      const { data } = await selectRoomCnt(selectObj);
      // console.log(data);
      return data;
    },
    staleTime: 1000 * 60,
  });

  // 장바구니 저장
  const { mutate: insertCart } = useMutation({
    mutationKey: ['insertCartItem'],
    mutationFn: async (cartItem) => {
      // cartItem.map((cart, idx) => console.log(cart));
      const cartInfo = cartItem.map((cart, idx) => {
        return {
          roomNo: cart.roomSq,
          memNo,
        };
      });
      // console.log(cartInfo);
      const { status } = await insertCartItem(cartInfo);

      if (status !== HttpStatusCode.Ok) {
        toast.error('장바구니 등록 실패');
        return;
      }

      return status;
    },
    onSuccess: (status, variable, context) => {
      if (status === HttpStatusCode.Ok) resetRemovedCart();
    },
  });

  // 장바구니 제거
  const { mutate: deleteCart } = useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: async (cartItem) => {
      const cartInfo = cartItem.map((cart, idx) => {
        return {
          roomNo: cart.roomSq,
          memNo,
        };
      });

      const { status } = await deleteCartItem(cartInfo);

      if (status !== HttpStatusCode.Ok) {
        toast.error('장바구니 제거 실패');
        return;
      }

      return status;
    },
    onSuccess: (status, variable, context) => {
      // console.log(status);
      if (status === HttpStatusCode.Ok) resetSelectedCart();
    },
  });

  const isSelected = (room) =>
    selectedItems.some((item) => item.roomSq === room.roomSq);

  const handleCartClick = (room) => {
    const alreadySelected = isSelected(room);
    toggleItem({
      roomSq: room.roomSq,
    });

    if (alreadySelected) {
      // console.log(alreadySelected);
      // console.log(selectedItems);
      toast.error('장바구니에서 제외되었습니다.');
    } else {
      toast.success('장바구니에 추가되었습니다.');
    }
  };

  // 객실 단건 예약
  const handleReservation = (room) => {
    const cnt = getRoomCnt(room.roomSq, roomCntList);
    if (cnt < room.roomCnt) {
      const resInfo = {
        roomNo: room.roomSq,
        roomName: room.roomName,
        roomPrice: room.roomPrice,
        accomNo: room.accomNo,
        accomName,
      };

      setRoomInfo([resInfo]);

      // 결제 페이지로 이동
      navigate(`/reservations`);
    } else {
      toast.error('예약 가능한 객실이 없습니다');
    }
  };

  // 장바구니 기능
  useEffect(() => {
    /**
     * 주기적인 API 호출은 비효율적
     *
     * 타이머 사용해서 일정 시간동안
     * 상태에 변화가 없을 경우 API 호출
     */
    if (!memNo) return;

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (selectedItems.length) insertCart(selectedItems);
      if (removedItems.length) deleteCart(removedItems);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [selectedItems, removedItems]);

  return (
    <section className='room-list'>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar
      />
      <div className='acc-detail-section__title'>객실 목록</div>
      {rooms.slice(0, visibleCount).map((room) => (
        <div
          className='room-card'
          key={room.roomSq}
        >
          <img
            className='room-img'
            src={`${VITE_SERVER_BASE_URL}${room.roomImgPathName}`}
            alt='객실 이미지'
            onError={(e) => {
              e.target.src =
                '/assets/images/alternative-images/alternative-image.png';
            }}
          />
          <div className='room-info-container'>
            <div className='room-info-line'></div>
            <div className='room-info_top'>
              <div className='room-info__name'>{room.roomName}</div>
              <div className='room-info__price'>
                {room.roomPrice?.toLocaleString('ko-KR')}원
              </div>

              <div className='room-info_bottom'>
                <div className='room-info-other'>
                  기준 인원: {room.roomStdPpl}명 / 최대 {room.roomMaxPpl}명
                </div>
                <div className='room-info__icons'>
                  <div className='room-info-fac__name'>객실 시설</div>
                </div>
                {renderIcons(selectedFacilities)}
                <div className='room-info__time'>
                  체크인: {room.roomChkIn} · 체크아웃: {room.roomChkOut}
                </div>
              </div>
            </div>
          </div>
          <div className='room-info__btn'>
            {memNo && (
              <Button
                className={`btn-cart ${isSelected(room) ? 'active' : ''}`}
                onClick={() => handleCartClick(room)}
              >
                <GrCart />
              </Button>
            )}
            {getRoomCnt(room.roomSq, roomCntList) < room.roomCnt ? (
              <Button
                className='btn-reserve'
                onClick={() => {
                  if (numberOfPeople <= room.roomMaxPpl) {
                    handleReservation(room);
                  } else toast.warn('객실 인원수 범위를 초과했습니다.');
                }}
              >
                객실 예약
              </Button>
            ) : (
              <Button disabled>예약 가능한 객실이 없습니다..</Button>
            )}
          </div>
        </div>
      ))}
      {visibleCount < rooms.length && (
        <div className='btn-more-container'>
          <button
            className='btn-more'
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default RoomList;
