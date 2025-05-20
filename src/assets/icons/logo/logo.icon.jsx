import { classNames } from '../../../utils';
import MainLogoEnSVG from './svg/logo_en.svg?react';
import MainLogoKrSVG from './svg/logo_kr.svg?react';

export const MainLogoEn = ({ className }) => {
	return <MainLogoEnSVG className={classNames('main-logo en', className)} />;
};

export const MainLogoKr = ({ className }) => {
	return <MainLogoKrSVG className={classNames('main-logo kr', className)} />;
};
