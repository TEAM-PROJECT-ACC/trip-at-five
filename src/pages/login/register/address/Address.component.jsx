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
					placeholder={'우편번호 입력'}
				/>
				<ButtonPrimary className={'register-address-serch '}>
					우편 번호 검색
				</ButtonPrimary>
			</div>

			<p className='register-address-text bold'>기본 주소</p>
			<div>
				<InputPrimary className={'address-main-input'} placeholder={'주소를 입력하세요'} />
			</div>

			<p className='register-address-text'>상세 주소</p>
			<InputPrimary className={'address-sub-input'} placeholder={'나머지 주소'} />

			<div className='register-address-btn'>
				<ButtonSecondary className={'address-btn-later'} onClick={addressOk}>나중에 입력</ButtonSecondary>
				<ButtonPrimary className={'adress-btn-check'}>회원가입</ButtonPrimary>
			</div>
		</div>
	);
}
