import { useEffect, useState } from 'react';
import { useUserInfoUpdateStore } from '../../../../../../states/user/userStore';
import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import './password.style.scss';

export const Password = () => {
	const { pwd, setPwd, pwdCheck, setPwdCheck } = useUserInfoUpdateStore();
	const [pwdText, setPwdText] = useState();
	const [pwdCheckText, setPwdCheckText] = useState();

	const pwdVerifi = (passwdText, setPasswdText) => {
		if (!passwdText) {
			setPasswdText('');
		} else {
			if (passwdText.length <= 7) {
				setPasswdText('8자 이상으로 설정해주세요');
			} else {
				setPasswdText('');
			}
		}
	};

	useEffect(() => {
		pwdVerifi(pwd, setPwdText);
	}, [pwd]);

	useEffect(() => {
		pwdVerifi(pwdCheck, setPwdCheckText);
	}, [pwdCheck]);

	return (
		<>
			<ContentsRow>
				<InfoInputLabel>비밀번호</InfoInputLabel>
				<InfoInput
					className='test'
					type={'Password'}
					placeholder={'비밀번호를 입력해주세요'}
					onChange={(e) => {
						setPwd(e);
					}}
					value={pwd}
				>
					<p className='input__p'> {pwdText} </p>
				</InfoInput>
			</ContentsRow>
			<ContentsRow>
				<InfoInputLabel>비밀번호 확인</InfoInputLabel>
				<InfoInput
					type={'Password'}
					placeholder={'비밀번호를 한번 더 입력해주세요'}
					onChange={(e) => {
						setPwdCheck(e);
					}}
					value={pwdCheck}
				>
					<p className='input__p'> {pwdCheckText} </p>
				</InfoInput>
			</ContentsRow>
		</>
	);
};
