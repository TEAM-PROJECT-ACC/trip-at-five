import { Link } from 'react-router-dom';
import { classNames } from '../../../utils';
import './adminLinkButton.style.scss';

export const AdminLinkButton = ({ className, children, to, ...props }) => {
  return (
    <Link
      className={classNames('admin-link__button', className)}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};
