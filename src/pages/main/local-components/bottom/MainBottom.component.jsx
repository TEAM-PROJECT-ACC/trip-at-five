import React from 'react';
import './MainBottom.style.scss';
import LocationList from './location/LocationList.component';

const MainBottom = () => {
  return (
    <div className='main-bottom__container'>
      <LocationList />
    </div>
  );
};

export default MainBottom;
