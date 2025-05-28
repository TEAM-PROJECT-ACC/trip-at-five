import './address.component.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../../components';
import { useRegisterStore } from '../RegisterStore';


export default function RegisterAdress() {
	const { step, setAddStep } = useRegisterStore();

	const addressOk = () => {
		setAddStep();
	};

	return (
		<div className='register-address-wrap'>
			<p className='register-address-text bold'>우편번호</p>

			<div className='register-address-Postal'>
				<InputPrimary
					className={'register-address-input '}
					placeholder={' '}
				/>
				<ButtonPrimary className={'register-address-serch '}>
					우편 번호 검색
				</ButtonPrimary>
			</div>

			<p className='register-address-text bold'>기본 주소</p>
			<div>
				<InputPrimary placeholder={' '} />
			</div>

			<p className='register-address-text'>상세 주소</p>
			<InputPrimary placeholder={' '} />

			<div className='register-address-btn'>
				<ButtonSecondary onClick={addressOk}>나중에 입력</ButtonSecondary>
				<ButtonPrimary>회원가입</ButtonPrimary>
			</div>
		</div>
	);
}
