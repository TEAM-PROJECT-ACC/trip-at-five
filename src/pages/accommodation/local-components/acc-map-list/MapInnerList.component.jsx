import React from 'react';
import { accomData } from '../../../../assets/sample-data/accomSampleData';
import MapInnerCard from './card/MapInnerCard.component';
import './mapInnerList.style.scss';

/**
 * 지도 모달창 카드 목록은 숙박업소명 순 정렬 (기본)
 */

export const MapInnerList = () => {
  const markedData = accomData.accommodation_tb.map((accom) => ({
    id: accom.accom_sq,
    name: accom.accom_name,
    price: Math.min(...accom.rooms.map((room) => room.room_price)),
    lat: accom.accom_lat,
    lon: accom.accom_lon,
    address: accom.accom_location,
    thumbnail: accom.accom_thumbnail,
  }));

  return (
    <ul className='acc-inner-list'>
      {markedData.map((accom) => (
        <MapInnerCard
          key={accom.id}
          accom={accom}
        />
      ))}
    </ul>
  );
};
