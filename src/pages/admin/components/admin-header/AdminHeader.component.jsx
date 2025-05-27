import {
  MdContactSupport,
  FaHotel,
  FaCalendarAlt,
  FaCalendarTimes,
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
    </header>
  );
};
