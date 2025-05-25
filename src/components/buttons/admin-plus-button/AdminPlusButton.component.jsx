import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import './AdminPlusButton.style.scss';

const AdminPlusButton = ({ onClick }) => {
  return (
    <div>
      <button className='plus-button' onClick={onClick}>
        <BsFillHouseAddFill />
      </button>
    </div>
  );
};

export default AdminPlusButton;
