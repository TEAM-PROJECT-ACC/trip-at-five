import React from 'react';
import './mapInnerCard.style.scss';
import { useNavigate } from 'react-router-dom';

const MapInnerCard = ({ accom }) => {
  const price = accom.price != null ? accom.price.toLocaleString() : '0';
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/accommodations/${accom.id}`);
  };

  const thumbnail =
    accom.images && accom.images.length > 0
      ? accom.images[0].accomImgPathName
      : '/assets/images/alternative-images/alternative-image.png';

  return (
    <>
      <li className='acc-list__box' onClick={handleCardClick}>
          <img className="acc-list-img"
            src={thumbnail}
            alt='숙박시설 이미지'
            onError={e => { e.target.src = '/assets/images/alternative-images/alternative-image.png'; }}
          />
        <div className='acc-list-info'>
          <div className='acc-list-title'>{accom.name}</div>
          <div className='acc-list-price'>
            <strong>₩{price}</strong>원
          </div>
        </div>
      </li>
      <div className='line'></div>
    </>
  );
};

export default MapInnerCard;
