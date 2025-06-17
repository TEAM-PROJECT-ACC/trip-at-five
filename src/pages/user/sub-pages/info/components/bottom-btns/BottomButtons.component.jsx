import { Button, ButtonPrimary, Modal } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import { useModal } from '../../../../../../hooks/use-modal/useModal.hook';
import './bottomButtons.style.scss';
import { DeactiveAccModal } from './deactive-acc-modal/DeactiveAccModal.component';
import { useUserInfoUpdateStore } from '../../../../../../states/user/userStore';
import { userInfoUpdate } from '../../../../../../services/user/userService';
import { loginStateStore } from '../../../../../../states/login/loginStore';
import {
	errorAlert,
	successAlert,
} from '../../../../../../utils/toastUtils/toastUtils';
import { useEffect, useState } from 'react';

export const BottomButtons = () => {
	const { isModalOpen, handleModalOpen } = useModal();
	const { ...initialState } = useUserInfoUpdateStore();
	const { resetUserInfoUpdateStore } = useUserInfoUpdateStore();
	const { loginInfo } = loginStateStore();
	const [isUpdate, setIsUpdate] = useState(false);

	const userUpdateTest = {
		email: loginInfo.memEmailId,
		pwd: initialState.pwd,
		nickName: initialState.nickName,
	};

	useEffect(() => {
		resetUserInfoUpdateStore();
		setIsUpdate(false);
	}, [isUpdate]);

	const sendUserInfo = async () => {
		if (initialState.isEmailCodeCheck) {
			const reuslt = await userInfoUpdate(userUpdateTest);
			if (reuslt.status === 200 && reuslt.data === 1) {
				successAlert('회원정보가 수정되었습니다.');
				setIsUpdate(true);
			}
		} else {
			errorAlert('인증후 진행해주세요');
		}
	};

	return (
		<div className={classNames('user-page', 'bottom-btns__container')}>
			<ButtonPrimary
				className='bottom-button update'
				onClick={sendUserInfo}
			>
				정보 수정
			</ButtonPrimary>
			<Button
				className='bottom-button deactivate'
				onClick={handleModalOpen}
			>
				계정 비활성화
			</Button>
			{isModalOpen && (
				<Modal modalHandler={handleModalOpen}>
					<DeactiveAccModal onClose={handleModalOpen} />
				</Modal>
			)}
		</div>
	);
};
