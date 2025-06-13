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
import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import {
  deleteCartItem,
  insertCartItem,
} from '../../../../services/cart/cartService.api';

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

const RoomList = ({ rooms = [], selectedFacilities = [] }) => {
  const timeoutRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const { selectedItems, removedItems } = useAccomCartStore((state) => state);
  const { resetSelectedCart, resetRemovedCart, toggleItem } =
    useAccomCartStore();

  const { mutate: insertCart } = useMutation({
    mutationKey: ['insertCartItem'],
    mutationFn: async (cartItem) => {
      const memSq = 2; // 추후 회원 데이터 조회해야함
      // cartItem.map((cart, idx) => console.log(cart));
      const cartInfo = cartItem.map((cart, idx) => {
        return {
          roomNo: cart.roomSq,
          memNo: memSq,
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

  const { mutate: deleteCart } = useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: async (cartItem) => {
      const memSq = 2;
      const cartInfo = cartItem.map((cart, idx) => {
        return {
          roomNo: cart.roomSq,
          memNo: memSq,
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

  // 장바구니 기능
  useEffect(() => {
    /**
     * 주기적인 API 호출은 비효율적
     *
     * 타이머 사용해서 일정 시간동안
     * 상태에 변화가 없을 경우 API 호출
     */
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (selectedItems.length > 0) {
        insertCart(selectedItems);
      }
      if (removedItems.length > 0) {
        deleteCart(removedItems);
      }
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [selectedItems.length, removedItems.length]);

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
            src='/assets/images/room-page/sample1.png'
          />
          <div className='room-info-container'>
            <div className='room-info-line'></div>
            <div className='room-info_top'>
              <div className='room-info__name'>{room.roomName}</div>
              <div className='room-info__price'>
                {room.roomPrice?.toLocaleString()}원
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
            <Button
              className={`btn-cart ${isSelected(room) ? 'active' : ''}`}
              onClick={() => handleCartClick(room)}
            >
              <GrCart />
            </Button>
            <Button className='btn-reserve'>객실 예약</Button>
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
