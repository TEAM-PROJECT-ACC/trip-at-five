import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../../components';
import { classNames } from '../../../utils';
import { SignUpInfoStore } from '../SignUpStore';
import './Sign-compelte.conponent.scss';

export default function SignCompelet() {
	const { nickName } = SignUpInfoStore();

	const clearLocalStorage = () => {
		window.localStorage.removeItem('SignUp-step');
		window.localStorage.removeItem('signInfo');
	};

	return (
		<div className='sign-comlet-wrap'>
			<p className='t1'>
				<span>{nickName}</span>님의 회원가입이 <br />
				완료되었습니다.
			</p>
			<Link to='/login'>
				<ButtonPrimary
					className={'sign-comlet-btn'}
					onClick={clearLocalStorage}
				>
					로그인
				</ButtonPrimary>
			</Link>
		</div>
	);
}
