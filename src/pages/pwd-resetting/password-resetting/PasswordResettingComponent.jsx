import { useState } from 'react';
import './passwordResettingStyle.scss';
import { ResettingInput } from '../resetting-input/ResettingInputComponent';
import { ResttingTitle } from '../resetting-title/ResettingTitleComponent';
import { ButtonPrimary } from '../../../components';
import { useIsResetting } from '../../../states/pwdRestting/resetting.state';
import { Link } from 'react-router-dom';

export function PasswordResetting({ className }) {
	const [pwd, setPwd] = useState(null);
	const [pwdCheck, setPwdCheck] = useState('');
	const { setIsFalse } = useIsResetting();

	const pCheck = pwd == pwdCheck ? 'ok' : 'fail';

	/* 로컬저장소 초기화*/

	/* 비밀번호 재설정 */
	const updatePwd = () => {
		setIsFalse();
		window.localStorage.removeItem('pwd-resetting');
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
			<ResttingTitle
				className={`pwd-resetting-receive ${
					pCheck != 'ok' ? 'pwd-fail-color' : ''
				} `}
				text={
					pwd == pwdCheck
						? '비밀번호가 일치합니다.'
						: '비밀번호가 일치하지 않습니다.'
				}
			/>

			<Link to='/login'>
				<ButtonPrimary
					className={'pwd-update'}
					onClick={updatePwd}
				>
					비밀번호 재설정
				</ButtonPrimary>
			</Link>
		</div>
	);
}
