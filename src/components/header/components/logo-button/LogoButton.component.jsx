import { Link } from 'react-router-dom';
import { MainLogoKr, MainLogoEn } from '../../../../assets/icons';
import { classNames } from '../../../../utils';

import './logoButton.style.scss';

export const LogoButton = () => {
  return (
    <Link
      className={classNames('global-header__logo-button')}
      to='/'
    >
      {/* NOTI: 확인 용 영어 로고 추가 */}
      {/* <MainLogoEn className={'global-header__logo'} /> */}
      <MainLogoKr className={'global-header__logo'} />
    </Link>
  );
};
