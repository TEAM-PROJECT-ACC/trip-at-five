import './comple.component.scss';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../../../components';
import { RegisterInfoStore } from '../RegisterStore';

export default function RegisterComple() {
	const { nickName, reset } = RegisterInfoStore();

	const clearLocalStorage = () => {
		window.localStorage.clear();
	};

	return (
		<div className='register-comple-wrap'>
			<p className='register-comple-text'>
				<span className='register-nickName'>{nickName}</span>님의 회원가입이
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
