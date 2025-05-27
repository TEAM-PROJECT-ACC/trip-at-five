import './login.password.resetting.scss';

import { PageContainer } from '../../../components';
import { ResttingTitle } from './resetting-title/resetting.title.conponent';
import { EmailAuth } from './resetting-Email-auth/Resetting.email.auth.conponent';
import { PasswordResetting } from './password-resetting/Password-resetting.conponent';

export default function PwdRestting() {
	return (
		<PageContainer>
			<div className='pwd-resetting-wrapcc'>
				{/*<ResttingTitle
					className={'resetting-title'}
					text={'비밀번호 재설정'}
				/>
				<ResttingTitle
					className={'resetting-Description'}
					text={'비밀번호를 재설정 하기 위해 이메일을 입력해주세요'}
				/> */}
				{/* <ResttingTitle
					className={'resetting-Description'}
					text={'한글을 제외한 영문, 숫자, 특수문자를 포함한 8자 이상'}
				/> */}

				{/* <EmailAuth /> */}
				{/* <PasswordResetting /> */}
			</div>
		</PageContainer>
	);
}
