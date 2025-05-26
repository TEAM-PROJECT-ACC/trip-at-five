import React from 'react';
import './AdminIconButton.style.scss';

const AdminIconButton = ({ onClick, children }) => {
  return (
    <div>
      <button className='icon-button' onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default AdminIconButton;
