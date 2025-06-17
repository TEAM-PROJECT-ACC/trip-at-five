import './pwdResetting.style.scss';
import { PageContainer } from '../../components';
import { ResettingTitle } from './resetting-title/PwdResettingTitle.component';
import { EmailAuth } from './Email-auth/PwdResettingEmailAuth.component';
import { PasswordResetting } from './password-resetting/PwdResetting.component';
import { useIsResetting } from '../../states/pwdResetting/pwdResettingStore';
import { useEffect } from 'react';

export default function PwdResetting() {
	const { isTrue, resetIsTrue } = useIsResetting();

	useEffect(()=>{
		resetIsTrue();
	},[])

	return (
		<PageContainer className={'resetting-container'}>
			<div className='pwd-resetting-wrap'>
				<ResettingTitle
					className={'resetting-title'}
					text={'비밀번호 재설정'}
				/>
				<ResettingTitle
					className={'resetting-Description'}
					text={`${
						isTrue == true
							? '한글을 제외한 영문, 숫자, 특수문자를 포함한 8자 이상'
							: '비밀번호를 재설정 하기 위해 이메일을 입력해주세요'
					}`}
				/>

				{isTrue != false ? <PasswordResetting /> : <EmailAuth />}
			</div>
		</PageContainer>
	);
}
