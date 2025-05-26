import './AdminMain.style.scss';
import AdminMainHeader from './header/AdminMainHeader.component';
import AdminMainBody from './body/AdminMainBody.component';

const AdminMain = () => {
  return (
    <>
      <AdminMainHeader className='admin-main-header' />
      <AdminMainBody className='admin-main-body' />
      {/* 관리자 페이지 네이션 */}
    </>
  );
};

export default AdminMain;
