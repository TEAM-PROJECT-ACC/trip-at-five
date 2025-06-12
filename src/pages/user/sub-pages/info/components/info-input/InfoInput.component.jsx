import { InputPrimary } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import './infoInput.style.scss';

export const InfoInput = ({ children, onChange, placeholder, type , value}) => {
  const handleChange = (event) => {
    const targetValue = event.target.value;
    if (onChange) {
      onChange(targetValue);
    }
  };

  return (
    <div className={classNames('user-page', 'info__input-container')}>
      <InputPrimary
        className='info__input'
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <div className='info__input-btn-container'>{children}</div>
    </div>
  );
};
