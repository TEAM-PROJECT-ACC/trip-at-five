import { classNames } from '../../../utils';
import './button.style.scss';

export const Button = ({
  className,
  children,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classNames('global-button', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
