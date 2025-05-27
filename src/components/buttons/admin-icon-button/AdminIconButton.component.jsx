import React from 'react';
import './AdminIconButton.style.scss';
import { useParams } from 'react-router-dom';

const AdminIconButton = ({ onClick, children }) => {
  const id = useParams();
  return (
    <button className='icon-button' onClick={() => onClick(id.id)}>
      {children}
    </button>
  );
};

export default AdminIconButton;
