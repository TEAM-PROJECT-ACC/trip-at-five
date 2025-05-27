import React from 'react';
import { accomData } from '../../../../assets/sample-data/accomSampleData';
import { getIconsFromRoomInfo } from './roomIconMap';
import './roomList.style.scss';

const RoomList = () => {
  return (
    <section className='room-list'>
      <h2>객실 목록</h2>
      {accomData.accommodation_tb.map((hotel) =>
        hotel.rooms.map((room) => (
          <div className='room-card' key={room.room_sq}>
            <div
              className='room-img'
              style={{
                backgroundImage: `url(${hotel.accom_thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className='room-info'>
              <h3>{room.room_name}</h3>
              <p className='room-price'>{room.room_price.toLocaleString()}원</p>
              <p>
                기준 {room.max_person}인 · 객실 {room.room_count}개
              </p>
              <p>체크인 13:00 · 체크아웃 11:00</p>
              <div className='room-icons'>
                {getIconsFromRoomInfo(room.room_info).map((icon, idx) => (
                  <span key={idx} className='room-icon'>
                    {icon}
                  </span>
                ))}
              </div>
              <button className='btn-reserve'>객실 예약</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default RoomList;
