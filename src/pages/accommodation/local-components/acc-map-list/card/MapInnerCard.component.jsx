import React from 'react';
import './mapInnerCard.style.scss';

const MapInnerCard = ({ accom }) => {
  const price = accom.price != null ? accom.price.toLocaleString() : '0';
  return (
    <>
      <li className='acc-list__box'>
        <div className='acc-list-img'>
          <img
            src={accom.thumbnail}
          />
        </div>
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
