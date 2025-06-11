import { useState } from 'react';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../../../../../components';
import './deactiveAddModal.style.scss';
import { userInactive } from '../../../../../../../services/user/userService';
import { errorAlert } from '../../../../../../../utils/toastUtils/toastUtils';
import { loginStateStore } from '../../../../../../../states/login/loginStore';
import { replace, useNavigate } from 'react-router-dom';

export const DeactiveAccModal = ({ onClose }) => {
	const [pwd, setPwd] = useState('');
	const [pwdCheck, setPwdCheck] = useState('');
	const { loginInfo } = loginStateStore();
	const navigate = useNavigate();

	const deActive = async () => {
		const result = pwd.length >= 1 && pwdCheck.length >= 1;

		if (result) {
			const respone = await userInactive(loginInfo.memEmailId);
			if (respone.status === 200 && respone.data === 0) {
				console.log('성공');
				// localStorage.clear;
				// sessionStorage.clear;
				// navigate('/', replace)
			}
		} else {
			errorAlert('비밀번호를 확인해주세요');
		}
	};

	return (
		<div className='deactive-acc-modal__container'>
			<div className='deactive-acc-modal__title'>계정 비활성화</div>
			<div className='deactive-acc-modal__input-container'>
				{/* grid 1fr 1fr */}
				{/* 비밀번호 */}
				<div className='deactive-acc-modal__input-label'>비밀번호</div>
				<InputPrimary
					className='deactive-acc-modal__input'
					type='password'
					placeholder='비밀번호를 입력해 주세요'
					onChange={(e) => {
						setPwd(e.target.value);
					}}
				/>

				{/* 비밀번호 확인 */}
				<div className='deactive-acc-modal__input-label'>비밀번호 확인</div>
				<InputPrimary
					className='deactive-acc-modal__input pwd-check'
					type='password'
					placeholder='비밀번호를 확인해 주세요'
					onChange={(e) => {
						setPwdCheck(e.target.value);
					}}
				/>
			</div>
			<div className='deactive-acc-modal__btn-container'>
				{/* 비활성화 */}
				{/* TODO: disabled 작업해야 함 */}
				<ButtonSecondary
					className='deactive-acc-modal__button'
					onClick={deActive}
				>
					비활성화
				</ButtonSecondary>
				{/* 취소 */}
				<ButtonPrimary
					className='deactive-acc-modal__button'
					onClick={onClose}
				>
					취소
				</ButtonPrimary>
			</div>
		</div>
	);
};
