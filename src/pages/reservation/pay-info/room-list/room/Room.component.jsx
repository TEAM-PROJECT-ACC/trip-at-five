import React from 'react';
import { useAccomSearchStore } from '../../../../../states/accom-search/accomSearchStore';

const Room = ({ className }) => {
  const { checkIn, checkOut } = useAccomSearchStore((state) => state);
  return (
    <div className={className}>
      <div className='room-image'></div>
      <div className='room-info'>
        <div>
          <h4>객실명</h4>
          <p>
            {checkIn} ~ {checkOut}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;
