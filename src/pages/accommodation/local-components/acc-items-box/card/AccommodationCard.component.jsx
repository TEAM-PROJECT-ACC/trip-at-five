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

const AccommodationCard = ({ accom }) => {
  const typeNameMap = {
    21: '모텔',
    22: '호텔',
    23: '펜션',
    24: '홈&빌라',
    25: '캠핑',
    26: '게하/한옥',
  };

  //const TypeIcon = typeIconMap[accom.type];
  const typeName = typeNameMap[accom.accomTypeNo] || '기타';

  return (
    <li className='accommodation-item'>
      <Link
        to={`/accommodations/${accom.accomSq}`}
        className='accom-link'
      >
        <div className='image'>
          <img
            src='/src/assets/images/acc-list-page/hotel-img.png'
            alt='숙박시설 이미지'
          />
        </div>
        <div className='accom-info'>
          <div className='level-one'>
            <div className='accom-name'>{accom.accomName}</div>
            <div
              className='accom-info-icon'
              title={accom.type}
            ></div>
          </div>
          <p className='accom-address'>{accom.accomAddr}</p>
          <div className='star'>
            <span className='star-icon'></span>
            {accom.rating}명 평가
          </div>
          <div className='accom-info-time-price'>
            {/* <div className='v-line'></div> */}
            <span>
              <p className='accom-time'>15:00 체크인</p>
              <p className='accom-time'>11:00 체크아웃</p>
            </span>
            <p className='accom-price'>
              <span className='accom-price-text'>최저가</span>
              <span className='accom-price-value'>
                <strong>{accom.roomPrice.toLocaleString()}</strong>
                <span>원</span>
              </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default AccommodationCard;
