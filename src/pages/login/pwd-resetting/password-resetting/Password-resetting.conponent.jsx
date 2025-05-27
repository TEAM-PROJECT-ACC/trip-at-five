import { useState } from 'react';
import './password-resetting.conponent.scss';
import { ResettingInput } from '../resetting-input/resetting.input.conponent';
import { ResttingTitle } from '../resetting-title/resetting.title.conponent';
import { ButtonPrimary } from '../../../../components';
import { useIsResetting } from '../state/resetting.state';
import { Link } from 'react-router-dom';

export function PasswordResetting({ className }) {
	const [pwd, setPwd] = useState(null);
	const [pwdCheck, setPwdCheck] = useState('');
	const {isTrue, setIsFalse} = useIsResetting();


	const updatePwd = () => {
		const test = pwd == pwdCheck ? 'ok' : 'fail';
		console.log(test);
		setIsFalse();
	};

	return (
		<div className='pwd-resetting-content-wrap'>
			<ResettingInput
				className={'pwd-resetting-text'}
				type={'password'}
				text={'비밀번호'}
				placeholder={'비밀번호를 입력해주세요'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ResettingInput
				className={'pwd-resetting-code-input'}
				type={'password'}
				text={'비밀번호 확인'}
				placeholder={'다시한번 입력해주세요'}
				onChange={(e) => {
					setPwdCheck(e.target.value);
				}}
			/>
			<ResttingTitle
				className={'pwd-resetting-receive color'}
				text={
					pwd == pwdCheck
						? '비밀번호가 일치합니다.'
						: '비밀번호가 일치하지 않습니다.'
				}
			/>
		  
			<Link to='/login'>
			<ButtonPrimary onClick={updatePwd}>
				비밀번호 재설정
			</ButtonPrimary>
			</Link>
		</div>
	);
}
