import './nickName.component.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../components';
import { MdOutlineRefresh } from '../../../assets/icons/kkh/index';

import { nickNameMaker } from './NickName-sample/NickName.sample';
import { RegisterInfostore, useRegisterStore } from '../RegisterStore';
import { nickNameDuplicationCheck } from '../../../services/register/apiService';

export default function RegisterNickName() {
	const { setAddStep } = useRegisterStore();
	const { nickName, setnickName, nickCheck, setnickNameCheck } =
		RegisterInfostore();

	let text = '';
	const result = document.querySelector('.nickName-duplicate-check');

	const resetNickName = async () => {
		let nick = nickNameMaker();
		setnickName(nick);

		const respone = await nickNameDuplicationCheck(nick);
		console.log(respone);
		if (respone == 1) {
			return resetNickName();
		}
		if (respone == 0) {
			text = '사용 가능한 닉네임입니다.';
			setnickNameCheck(true);
			result.innerText = text;
		}
	};

	const nickNameDuplicateCheck = async () => {
		const respone = await nickNameDuplicationCheck(nickName);

		if (respone == 0) {
			text = '사용 가능한 닉네임입니다.';
			setnickNameCheck(true);
		} else {
			text = '이미 사용중인 닉네임입니다.';
			setnickNameCheck(false);
		}
		result.innerText = text;
	};

	const nickNameOk = () => {
		nickCheck && true && setAddStep();
	};

	return (
		<div className='register-nickName-wrap'>
			<div className='register-nickName-overlap'>
				<p className='register-nickName-text'>닉네임</p>
				<InputPrimary
					className={'register-nickName-input'}
					placeholder={'닉네임 입력해주세요'}
					onChange={(e) => {
						setnickName(e.target.value);
					}}
					value={nickName}
				/>
				<MdOutlineRefresh
					className='overlap-icon'
					onClick={resetNickName}
				/>
				<p
					className={`nickName-duplicate-check ${
						nickCheck == true
							? 'nickName-duplicate-check-ok'
							: 'nickName-duplicate-check-fail'
					}`}
				>
					{' '}
				</p>
			</div>

			<div className='register-nickname-btn'>
				<ButtonPrimary
					className={'nickname-btn-duplicate'}
					onClick={nickNameDuplicateCheck}
				>
					중복 검사
				</ButtonPrimary>
				<ButtonSecondary
					className={'nickName-btn-check'}
					onClick={nickNameOk}
				>
					확인
				</ButtonSecondary>
			</div>
		</div>
	);
}
