import React from 'react';
import './AdminSearchButton.style.scss';

const AdminSearchButton = ({ onClick }) => {
  return (
    <button className='search-button' onClick={onClick}>
      검색
    </button>
  );
};

export default AdminSearchButton;
