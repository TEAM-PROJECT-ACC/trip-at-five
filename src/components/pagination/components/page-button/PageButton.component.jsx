import { classNames } from '../../../../utils';
import './pageButton.style.scss';

export const PageButton = ({
  children,
  className,
  selected,
  onClick,
  disabled,
}) => {
  return (
    <span
      className={classNames(
        'global-pagination__page-button',
        className,
        selected ? 'selected' : '',
        disabled ? 'disabled' : ''
      )}
    >
      <Button
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </span>
  );
};

const Button = ({ children, className }) => {
  return (
    <button className={classNames('global-pagination__button', className)}>
      {children}
    </button>
  );
};
