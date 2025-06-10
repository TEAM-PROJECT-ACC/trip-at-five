import { useState } from 'react';
import './pwdResetting.style.scss';
import { ResettingInput } from '../resetting-input/PwdResettingInput.component';
import { ButtonPrimary } from '../../../components';
import {
	useIsResetting,
	useResettingInfo,
} from '../../../states/pwdRestting/pwdResettingStore';
import { Link } from 'react-router-dom';
import { updatePwd } from '../../../services/pwdResetting/pwdResetting';
import { successAlert } from '../../../utils/toastUtils/toastUtils';

export function PasswordResetting({ className }) {
	const { email, pwd, setPwd } = useResettingInfo();
	const [pwdCheck, setPwdCheck] = useState('');
	const { setIsFalse } = useIsResetting();

	const passwordCheckFail = pwd !== pwdCheck;

	/* 비밀번호 재설정 */
	const updatePassword = async () => {
		const result = await updatePwd(email, pwd);
		console.log(result);

		if ((result.data === 1) & (result.status === 200)) {
			successAlert('비밀번호 변경 성공했습니다.')
			setIsFalse();
			window.localStorage.removeItem('pwd-resetting');
			window.localStorage.removeItem('pwdResettingInfo');
		}
	};

	return (
		<div className='pwd-resetting-content-wrap'>
			<ResettingInput
				TclassName={'pwd-resetting-pwd-text'}
				IclassName={'pwd-resetting-pwd-input'}
				type={'password'}
				text={'비밀번호'}
				placeholder={'비밀번호를 입력해주세요'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ResettingInput
				TclassName={'pwd-resetting-pwd-check-text'}
				IclassName={'pwd-resetting-pwd-check-input'}
				type={'password'}
				text={'비밀번호 확인'}
				placeholder={'다시한번 입력해주세요'}
				onChange={(e) => {
					setPwdCheck(e.target.value);
				}}
			/>

			{passwordCheckFail && (
				<p
					className={`pwd-resetting-receive pwd-fail-color
					 `}
				>
					비밀번호가 일치하지 않습니다
				</p>
			)}

			<Link to='/login'>
			<ButtonPrimary
				className={'pwd-update'}
				onClick={updatePassword}
			>
				비밀번호 재설정
			</ButtonPrimary>
			</Link>
		</div>
	);
}
