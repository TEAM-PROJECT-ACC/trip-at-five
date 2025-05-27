import React, { useState }from 'react';
import { accomData } from '../../../../assets/sample-data/accomSampleData';
import { getIconsFromRoomInfo } from './roomIconMap';
import './roomList.style.scss';
import {GrCart} from '../../../../assets/icons/ys/index'

const RoomList = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const roomsCount = accomData.accommodation_tb.flatMap((hotel) =>
    hotel.rooms.map((room) => ({ ...room, hotelName: hotel.accom_name }))
  );

  const visibleRooms = roomsCount.slice(0, visibleCount);

  return (
    <section className='room-list'>
      <div className="acc-detail-section__title">객실 목록</div>
      {visibleRooms.map((room) => (
          <div className='room-card' key={room.room_sq}>
            <div className='room-img' />
            <div className='room-info-container'>
              <div className='room-info-line'></div>
              <div className='room-info_top'>
                <div className='room-info__name'>{room.room_name}</div>
                <div className='room-info__price'>{room.room_price.toLocaleString()}원</div>
                <div className='room-info_bottom'>
                  <div className='room-info-other'>
                    기준 {room.max_person}인 · 객실 {room.room_count}개
                  </div>
                  <div className='room-info__icons'>
                    <div className='room-info-fac__name'>객실 시설</div>
                  </div>
                  {getIconsFromRoomInfo(room.room_info).map((icon, idx) => (
                        <div key={idx} className='room-icon'>{icon}</div>
                        ))}
                  <div className='room-info__time'>체크인 13:00 · 체크아웃 11:00</div>
                </div>
              </div>
            </div>
            <div className='room-info__btn'>
              <button className='btn-cart'><GrCart /></button>
              <button className='btn-reserve'>객실 예약</button>
            </div>
          </div>
        ))}
        {visibleCount < roomsCount.length && (
        <div className='btn-more-container'>
          <button
            className='btn-more'
            onClick={() => setVisibleCount((prev) => prev + 5)}>
            더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default RoomList;
