import { useEffect } from 'react';
import { ButtonPrimary, ButtonSecondary } from '../../../../../../components';
import {
	emailDuplicationCheck,
	sendEmailCode,
} from '../../../../../../services/common/commonService';
import { useUserInfoUpdateStore } from '../../../../../../states/user/userStore';
import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import { AuthEmailCodeInput } from './auth-code/AuthCode.component';
import './email.style.scss';
import {
	errorAlert,
	infoAlert,
	successAlert,
} from '../../../../../../utils/toastUtils/toastUtils';
import { loginStateStore } from '../../../../../../states/login/loginStore';

export const Email = () => {
	const { email, setEmail } = useUserInfoUpdateStore();
	const { loginInfo } = loginStateStore();

	const emailDuplication = async () => {
		if (loginInfo.memEmailId === email) {
			const result = await emailDuplicationCheck(email);
			if (result.status === 200) {
				if (result.data === 1) {
					infoAlert('인증코드를 전송했습니다.');
					await sendEmailCode(email);
				} else {
					errorAlert('가입한 이메일이 아닙니다.');
				}
			}
		} else {
       errorAlert('가입한 이메일로 인증해주세요.');
		}
	};

	return (
		<>
			<ContentsRow>
				<InfoInputLabel>이메일</InfoInputLabel>
				<InfoInput
					placeholder={'이메일을 입력해주세요'}
					onChange={(e) => {
						setEmail(e);
					}}
					onClick={emailDuplication}
					value={email}
				>
					<ButtonPrimary
						className='input__button'
						onClick={emailDuplication}
					>
						이메일 인증
					</ButtonPrimary>
				</InfoInput>
			</ContentsRow>
			{/* TODO: 이메일 인증 버튼 클릭, 응답 확인 후 인증번호 input 표시 */}
			{<AuthEmailCodeInput />}
		</>
	);
};
