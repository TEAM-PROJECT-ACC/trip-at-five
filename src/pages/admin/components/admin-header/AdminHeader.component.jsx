import {
  MdContactSupport,
  FaHotel,
  FaCalendarAlt,
  FaCalendarTimes,
  MainLogoKr,
} from '../../../../assets/icons/index';
import { classNames } from '../../../../utils';
import { AdminLinkButton } from '../../../../components/buttons/admin-link-button/AdminLinkButton.component';
import { ADMIN_ROUTE } from '../../constants/routes-path/adminRoute.constant';
import './adminHeader.style.scss';

const buttonIcons = {
  accommodations: FaHotel,
  reservations: FaCalendarAlt,
  'cancel-reservations': FaCalendarTimes,
  contact: MdContactSupport,
};

export const AdminHeader = () => {
  // TODO: 사용자 문의 실시간 데이터 확인 필요

  return (
    <header className='admin-header__container'>
      <div className='admin-header__inner'>
        <div className='admin-header__logo-container'>
          <MainLogoKr className='admin-header__logo' />
          <span className='admin-header__page-title admin-input'>
            {/* TODO: 관리자 계정의 이메일 아이디 값 */}
            {'Admin-email-id'}
          </span>
        </div>
        <div className='admin-header__link-container'>
          {ADMIN_ROUTE.map((route, idx) => {
            const Icons = buttonIcons[route.path];
            return (
              <AdminLinkButton
                key={idx}
                className={classNames('admin-header__button', route.className)}
                to={route.path}
              >
                {<Icons className='admin-header__btn-icon' />}
                {route.title}
              </AdminLinkButton>
            );
          })}
        </div>
      </div>
    </header>
  );
};
