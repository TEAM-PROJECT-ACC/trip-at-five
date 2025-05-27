import AdminHeaderTitle from '../../../../components/admin-header-title/AdminHeaderTitle.component';
import './AdminHeader.style.scss';

const AdminHeader = ({ className, children, title }) => {
  return (
    <header className={className}>
      <AdminHeaderTitle title={title} />
      {children}
    </header>
  );
};

export default AdminHeader;
