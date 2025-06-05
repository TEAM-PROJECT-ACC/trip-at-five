import React, { useState } from 'react';
//import { accomData } from '../../../../assets/sample-data/accomSampleData';
import { getIconsFromRoomInfo } from './roomIconMap';
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

  return (
    <section className='room-list'>
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
            <a
              href='/carts'
              className='btn-cart'
            >
              <GrCart />
            </a>
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
