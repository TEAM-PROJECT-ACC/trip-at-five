import { ButtonPrimary, ButtonSecondary } from '../../../../../../components';
import { nickNameDuplicationCheck } from '../../../../../../services/register/apiService';
import { useUserInfoUpdateStore } from '../../../../../../states/user/userStore';
import {
	errorAlert,
	successAlert,
} from '../../../../../../utils/toastUtils/toastUtils';
import { nickNameMaker } from '../../../../../register/nickName/NickName-sample/NickNameSample.component';
import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import './nickname.style.scss';

export const Nickname = () => {
	const { nickName, setNickName } = useUserInfoUpdateStore();

	const resetNickName = async () => {
		setNickName(nickNameMaker());
		const response = await nickNameDuplicationCheck(nickName);
		if (response.status === 200) {
			if (response == 1) {
				return resetNickName();
			}
			if (response.data == 0) {
				successAlert('사용 가능한 닉네임입니다.');
			}
		}
		console.log(nickName);
	};

	const nickNameDupliCheck = async () => {
		const response = await nickNameDuplicationCheck(nickName);
		console.log(response);
		if (response.status === 200) {
			if (response.data === 0) {
				successAlert('사용 가능한 닉네임입니다.');
			} else {
				errorAlert('닉네임이 중복됩니다.');
			}
		} else {
			errorAlert('닉네임이 중복됩니다.');
		}
	};

	return (
		<ContentsRow>
			<InfoInputLabel>닉네임</InfoInputLabel>
			<InfoInput
				placeholder={'닉네임을 입력해주세요'}
				value={nickName}
				onChange={(e) => {
					setNickName(e);
				}}
			>
				<ButtonSecondary
					className='input__button'
					onClick={nickNameDupliCheck}
				>
					중복 검사
				</ButtonSecondary>
				<ButtonPrimary
					className='input__button'
					onClick={resetNickName}
				>
					추천 닉네임
				</ButtonPrimary>
			</InfoInput>
		</ContentsRow>
	);
};
