import './password.resetting.component.scss';
import { PageContainer } from '../../components';
import { ResttingTitle } from './resetting-title/Resetting.title.conponent';
import { EmailAuth } from './resetting-Email-auth/Resetting.email.auth.conponent';
import { PasswordResetting } from './password-resetting/Password-resetting.conponent';
import { useIsResetting } from '../../states/pwdRestting/resetting.state';

export default function PwdRestting() {
	const { isTrue, setIsFalse } = useIsResetting();

	const reset = () => {
		setIsFalse();
		console.log(isTrue);
	};

	return (
		<PageContainer className={'resetting-container'}>
			<div className='pwd-resetting-wrap'>
				<ResttingTitle
					className={'resetting-title'}
					text={'비밀번호 재설정'}
				/>
				<ResttingTitle
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
