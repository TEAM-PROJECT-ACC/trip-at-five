import { useState } from 'react';
import './textarea.style.scss';
import { classNames } from '../../utils';

export const Textarea = ({
  className,
  defaultValue,
  onChange,
  placeholder,
  ...props
}) => {
  const [value, setValue] = useState(() => defaultValue || '');

  const handleChange = (event) => {
    const targetValue = event.target.value;
    setValue(() => targetValue);
    if (onChange) {
      onChange(targetValue);
    }
  };

  return (
    <textarea
      className={classNames('global-textarea', className)}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
};
