import { useState } from 'react';
import './password-resetting.conponent.scss';
import { ResettingInput } from '../resetting-input/resetting.input.conponent';
import { ResttingTitle } from '../resetting-title/resetting.title.conponent';
import { ButtonPrimary } from '../../../../components';

export function PasswordResetting({ className }) {
	const [pwd, setPwd] = useState(null);
	const [verifi, setVerifi] = useState(false);
	const [pwdCheck, setPwdCheck] = useState();

	const checkPwd = () => {
		{
			pwd == pwdCheck && setVerifi(true);
		}
	};

	const updatePwd = () => {
		const test = pwd == pwdCheck ? 'ok' : 'fail';
		console.log(test);
	};

	return (
		<div className='pwd-resetting-content-wrap'>
			<ResettingInput
				className={'pwd-resetting-text'}
				text={'비밀번호'}
				placeholder={'비밀번호를 입력해주세요'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ResettingInput
				className={'pwd-resetting-code-input'}
				type={'email'}
				text={'비밀번호 확인'}
				placeholder={'다시한번 입력해주세요'}
				onChange={(e) => {
					setPwdCheck(e.target.value);
				}}
			/>
			<ResttingTitle
				className={'pwd-resetting-receive color'}
				text={
					verifi == true
						? '비밀번호가 일치합니다.'
						: '비밀번호가 일치하지 않습니다.'
				}
				onChange={checkPwd}
			/>

			<ButtonPrimary onClick={verifi && updatePwd}>
				비밀번호 재설정
			</ButtonPrimary>
		</div>
	);
}
