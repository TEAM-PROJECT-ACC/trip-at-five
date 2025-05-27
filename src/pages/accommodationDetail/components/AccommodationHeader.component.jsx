import React from 'react';
//import './roomList.style.scss';

const AccommodationHeader = ({ name, location, basePrice }) => {
  return (
    <section className='accom-header'>
      <img src='' className='accom-header__image' />
      <div className='accom-header__text'>
        서울신라호텔
        <div className='accom-header__price'>
          150,000원 / <p>1박</p>
        </div>
      </div>
      <p className='accom-location'>서울 중구 장충동2가 202</p>
    </section>
  );
};

export default AccommodationHeader;
