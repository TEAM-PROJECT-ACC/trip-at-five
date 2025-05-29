import { useState } from 'react';
import { classNames } from '../../../utils';
import './input.style.scss';

export const Input = ({
  className,
  defaultValue,
  placeholder,
  onChange,
  type,
  ...props
}) => {
  const [value, setValue] = useState(() => defaultValue || '');

  const handleChange = (event) => {
    const targetValue = event.target.value;
    setValue(() => targetValue);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      className={classNames('global-input', className)}
      value={value}
      onChange={handleChange}
      placeholder={placeholder || '텍스트를 입력해주세요'}
      type={type}
      {...props}
    />
  );
};
