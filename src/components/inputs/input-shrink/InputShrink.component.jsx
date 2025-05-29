import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../utils';
import { Input } from '../index';
import './inputShrink.style.scss';

export const InputShrink = ({
  id,
  className,
  defaultValue,
  onChange,
  type,
  labelText,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(() => false);
  const [value, setValue] = useState(() => defaultValue || '');
  const focusRef = useRef();

  const handleFocus = () => {
    if (value !== '') {
      return;
    }
    setIsFocus((prev) => !prev);
  };

  const handleChange = (event) => {
    const targetValue = event.target.value;
    setValue(() => targetValue);

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    const handleClickOut = (event) => {
      if (
        focusRef.current &&
        !focusRef.current.contains(event.target) &&
        value === ''
      ) {
        setIsFocus(() => false);
      }
    };

    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, [value]);

  return (
    <span
      ref={focusRef}
      className={classNames(
        'global-input__shrink-container',
        className,
        isFocus ? 'focus' : ''
      )}
    >
      <label
        htmlFor={id}
        className={classNames('global-input__shrink-label', className)}
      >
        {labelText}
      </label>
      <Input
        id={id}
        className={classNames('global-input__shrink', className)}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={' '}
        type={type}
        {...props}
      />
    </span>
  );
};
