import React from 'react';
import { Input } from '../input/Input.component';
import { classNames } from '../../../utils';
import './AdminInput.style.scss';

const AdminInput = ({
  className,
  defaultValue,
  placeholder,
  onChange,
  type,
  ...props
}) => {
  return (
    <Input
      className={classNames('admin-input', className)}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  );
};

export default AdminInput;
