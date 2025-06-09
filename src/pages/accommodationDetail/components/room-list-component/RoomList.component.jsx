import React, { useState, useEffect } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(10);

  const selectedItems = useAccomCartStore((state) => state.selectedItems);
  const toggleItem = useAccomCartStore((state) => state.actions.toggleItem);

  const isSelected = (room) =>
    selectedItems.some(
      (item) =>
        item.accomNo === room.accomNo &&
        item.roomSq === room.roomSq &&
        item.roomPrice === room.roomPrice
    );

  const handleCartClick = (room) => {
    const alreadySelected = isSelected(room);
    toggleItem({
      accomNo: room.accomNo,
      roomSq: room.roomSq,
      roomPrice: room.roomPrice,
    });

    if (alreadySelected) {
      toast.error('장바구니에서 제외되었습니다.');
    } else {
      toast.success('장바구니에 추가되었습니다.');
    }
  };

  useEffect(() => {
    console.log('selectedItems:', selectedItems);
  }, [selectedItems]);

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
            <button
              className={`btn-cart ${isSelected ? 'active' : ''}`}
              onClick={() => handleCartClick(room)}
            >
              <GrCart />
            </button>
            <button className='btn-reserve'>객실 예약</button>
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
