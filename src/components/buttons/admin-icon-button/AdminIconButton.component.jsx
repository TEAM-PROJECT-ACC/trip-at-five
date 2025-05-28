import React from 'react';
import './AdminIconButton.style.scss';
import { useParams } from 'react-router-dom';

const AdminIconButton = ({ onClick, children }) => {
  return (
    <button className='icon-button' onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default AdminIconButton;
