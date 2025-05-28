import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaBed,
  FaHotel,
  FaCampground,
  FaHouseUser,
  MdHouse,
  MdVilla,
} from '../../../../../assets/icons/ys/index';
import './accommodationCard.style.scss';

const typeIconMap = {
  모텔: FaBed,
  호텔: FaHotel,
  펜션: MdHouse,
  '홈&빌라': MdVilla,
  캠핑: FaCampground,
  '게하/한옥': FaHouseUser,
};

const AccommodationCard = ({ accom }) => {
  const TypeIcon = typeIconMap[accom.type];

  return (
    <li className='accommodation-item'>
      <Link to={`/accommodations/${accom.id}`} className="accom-link">
        <div className='image'>
        <img
          src='/src/assets/images/acc-list-page/hotel-img.png'
          alt='숙박시설 이미지'
        />
      </div>
      <div className='accom-info'>
        <div className='level-one'>
          <div className='accom-name'>{accom.name}</div>
          <div
            className='accom-info-icon'
            title={accom.type}
          >
            <TypeIcon />
          </div>
        </div>
        <p className='accom-address'>{accom.address}</p>
        <div className='star'>
          <span className='star-icon'></span>
          {accom.rating}명 평가
        </div>
        <div className='accom-info-time-price'>
          <div className='v-line'></div>
          <p className='accom-time'>{accom.checkIn} 체크인</p>
          <p className='accom-time'>{accom.checkOut} 체크아웃</p>
          <p className='accom-price'>
            최저가 <strong>{accom.price.toLocaleString()}</strong>원
          </p>
        </div>
      </div>
      </Link>
    </li>
  );
};

export default AccommodationCard;
