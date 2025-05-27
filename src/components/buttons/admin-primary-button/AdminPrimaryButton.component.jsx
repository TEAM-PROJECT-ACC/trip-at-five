import React from 'react';
import './AdminPrimaryButton.style.scss';
import { classNames } from '../../../utils';

const AdminPrimaryButton = ({ className, onClick, children, ...props }) => {
  return (
    <button className={classNames('admin-button', className)} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default AdminPrimaryButton;
