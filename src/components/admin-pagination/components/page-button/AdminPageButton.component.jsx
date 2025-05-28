import { classNames } from '../../../../utils';
import './AdminPageButton.style.scss';

export const AdminPageButton = ({
  children,
  className,
  selected,
  onClick,
  disabled,
}) => {
  return (
    <span
      className={classNames(
        'admin-pagination__page-button',
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

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={classNames('admin-pagination__button', className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
