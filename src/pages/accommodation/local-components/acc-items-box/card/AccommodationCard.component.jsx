import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaBed,
  FaHotel,
  TbBeach,
  MdHouse,
  FaCampground,
  FaHouseUser,
  FaBuilding,
} from '../../../../../assets/icons/ys/index';
import './accommodationCard.style.scss';
import { Star } from '../../../../../components/star-rating/components/star/Star.component';
import { getAccomReviewCountAPI } from '../../../../../services/review/reviewService.api';
import { VITE_SERVER_BASE_URL } from '../../../../../../env.config';
const typeNameMap = {
  21: '모텔',
  22: '호텔',
  23: '리조트',
  24: '펜션',
  25: '캠핑',
  26: '게하/한옥',
  999: '미지정',
};

const typeIconMap = {
  모텔: <FaBuilding />,
  호텔: <FaHotel />,
  리조트: <TbBeach />,
  펜션: <MdHouse />,
  캠핑: <FaCampground />,
  '게하/한옥': <FaHouseUser />,
  미지정: <FaBed />,
};

const AccommodationCard = ({ accom }) => {
  const typeName = typeNameMap[accom.accomTypeNo] || '미지정';
  const typeIcon = typeIconMap[typeName] || typeIconMap['미지정'];
  const reviewCount = accom.reviewCount || 0;

  return (
    <li className='accommodation-item'>
      <Link
        to={`/accommodations/${accom.accomSq}`}
        className='accom-link'
      >
        <div className='image'>
          <img
            src={`${VITE_SERVER_BASE_URL}${accom.accomImgPathName}`}
            alt='숙박시설 이미지'
            onError={(e) => {
              e.target.src =
                '/assets/images/alternative-images/alternative-image.png';
            }}
          />
        </div>
        <div className='accom-info'>
          <div className='level-one'>
            <div className='accom-name'>{accom.accomName}</div>
            <div
              className='accom-info-icon'
              title={typeName}
            >
              {typeIcon}
            </div>
          </div>
          <p className='accom-address'>{accom.accomAddr}</p>
          <div className='star'>
            <span className='star-icon'>
              <Star className='accom-list-star-size' />
              {reviewCount} 명 평가
            </span>
          </div>
          <div className='accom-info-time-price'>
            {/* <div className='v-line'></div> */}
            <span>
              <p className='accom-time'>{accom.roomChkIn} 체크인</p>
              <p className='accom-time'>{accom.roomChkOut} 체크아웃</p>
            </span>
            <p className='accom-price'>
              <span className='accom-price-text'>최저가</span>
              <span className='accom-price-value'>
                <strong>{accom.roomPrice}</strong>
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
