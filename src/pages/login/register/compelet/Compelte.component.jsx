import './compelte.component.scss';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../../../components';
import { RegisterInfoStore } from '../RegisterStore';

export default function RegisterCompelet() {
	const { nickName } = RegisterInfoStore();

	const clearLocalStorage = () => {
		window.localStorage.removeItem('register-step');
		window.localStorage.removeItem('register-Info');
	};

	return (
		<div className='register-comlet-wrap'>
			<p className='t1'>
				<span>{nickName}</span>님의 회원가입이
				완료되었습니다.
			</p>
			<Link to='/login'>
				<ButtonPrimary
					className={'register-comlet-btn'}
					onClick={clearLocalStorage}
				>
					로그인
				</ButtonPrimary>
			</Link>
		</div>
	);
}
