import { classNames } from '../../../utils';
import './AdminPrimaryButton.style.scss';

const AdminPrimaryButton = ({ className, onClick, children, ...props }) => {
  return (
    <button
      className={classNames('admin-button', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AdminPrimaryButton;
