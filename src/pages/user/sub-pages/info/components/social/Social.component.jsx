import { classNames } from '../../../../../../utils';
import { ContentsRow, InfoInputLabel } from '../index';
import { FcGoogle, MainLogoEn } from '../../../../../../assets/icons/index';
import {
	SiNaver,
	RiKakaoTalkFill,
} from '../../../../../../assets/icons/kkh/index';
import './social.style.scss';
import { loginStateStore } from '../../../../../../states/login/loginStore';

export const Social = () => {
	const { loginInfo } = loginStateStore();
  

	const snsIcon = [
		{
			id: 'user',
			name: MainLogoEn,
			class: 'trip-nomal-user',
		},
		{
			id: 'kakaoUser',
			name: RiKakaoTalkFill,
			class: 'sns-color-kakao',
		},
		{
			id: 'naverUser',
			name: SiNaver,
			class: 'sns-color-naver',
		},
		{
			id: 'googleUser',
			name: FcGoogle,
			class: '',
		},
	];

	const Test = () => {};

	return (
		<ContentsRow>
			<InfoInputLabel>소셜 로그인</InfoInputLabel>
			<div className={classNames('user-page', 'social-row__icon-container')}>
				{snsIcon.map((icon) => {
					if (icon.id === loginInfo.memType) {
						return (
							<icon.name
								key={icon.id}
								className={`social-row_icon ${icon.class}`}
							/>
						);
					}
				})}
			</div>
		</ContentsRow>
	);
};
