import React from 'react';
import './LocationList.style.scss';

const LocationList = () => {
  // 추후 데이터 불러올것
  const locationName = ['서울', '인천', '부산', '강원', '제주', '전남', '전북', '경기'];
  const colorArr = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple', 'black'];

  return (
    <div className='location-list-container'>
      {locationName.map((name, idx) => {
        return (
          <div key={idx} style={{ backgroundColor: `${colorArr[idx]}` }}>
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default LocationList;
