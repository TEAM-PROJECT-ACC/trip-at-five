import './tel.component.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../../components';
import { RegisterInfoStore, useRegisterStore } from '../RegisterStore';

export default function RegisterTel() {
	const { step, setAddStep } = useRegisterStore();
	const { tel, setTel } = RegisterInfoStore();

	const telSkip = () => {
		setAddStep();
	};

	const telOk = () => {
		tel != null ? setAddStep() : console.log('t');
	};

	return (
		<div className='register-tel-wrap'>
			<p className='register-tel-text'>전화번호</p>
			<InputPrimary
				placeholder={'연락처를 입력해주세요'}
				onChange={(e) => {
					setTel(e.target.value);
				}}
			/>
			<div className='register-tel-btn'>
				<ButtonSecondary onClick={telSkip}>나중에 입력</ButtonSecondary>
				<ButtonPrimary onClick={telOk}>확인</ButtonPrimary>
			</div>
		</div>
	);
}
