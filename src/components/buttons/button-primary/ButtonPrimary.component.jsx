import { classNames } from '../../../utils/index';
import { Button } from '../index';
import './buttonPrimary.style.scss';

export const ButtonPrimary = ({ className, children, onClick, ...props }) => {
  return (
    // div style
    <Button
      className={classNames('global-button__primary', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
