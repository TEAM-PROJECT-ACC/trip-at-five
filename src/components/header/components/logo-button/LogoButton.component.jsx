import { MainLogoKr, MainLogoEn } from '../../../../assets/icons';
import { classNames } from '../../../../utils';
import { Button } from '../../../buttons/button/Button.component';

import './logoButton.style.scss';

export const LogoButton = () => {
	// TODO: '/' 경로 이동 기능 구현
	return (
		<Button className={classNames('global-header__logo-button')}>
			{/* NOTI: 확인 용 영어 로고 추가 */}
			{/* <MainLogoEn className={'global-header__logo'} /> */}
			<MainLogoKr className={'global-header__logo'} />
		</Button>
	);
};
