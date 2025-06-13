import { UserPageContainer } from '../../components/page-container/UserPageContainer.component';
import { FcGoogle } from '../../../../assets/icons/index';
import { BottomButtons, Email, Nickname, Password, Social } from './components';

import './userInfo.style.scss';
import { useUserInfoUpdateStore } from '../../../../states/user/userStore';
import { useEffect } from 'react';

export const UserInfo = () => {
	// TODO: 유저 정보 local storage에서 가지고 옴
	const { resetUserInfoUpdateStore } = useUserInfoUpdateStore();

	useEffect(() => {
		resetUserInfoUpdateStore();
	}, []);

	return (
		<UserPageContainer className='user-info'>
			{/* 이메일, input, button */}
			{/* 인증 번호, input, button */}
			<Email />
			{/* 비밀번호, input */}
			{/* 비밀번호 확인, input */}
			<Password />
			{/* 닉네임, nickname, button * 2 */}
			<Nickname />
			{/* 소셜 로그인, icon */}
			<Social />
			{/* TODO: 회원 정보 확인 후 아이콘 변경 */}
			<BottomButtons />
		</UserPageContainer>
	);
};
