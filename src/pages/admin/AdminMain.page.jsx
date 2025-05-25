import './AdminMain.style.scss';
import AdminMainHeader from './main/header/AdminMainHeader.component';
import AdminMainBody from './main/body/AdminMainBody.component';

const AdminMain = () => {
  return (
    <div className='admin-main__container'>
      <AdminMainHeader className='admin-main-header' />
      <AdminMainBody className='admin-main-body' />

      {/* 관리자 페이지 네이션 */}
    </div>
  );
};

export default AdminMain;
