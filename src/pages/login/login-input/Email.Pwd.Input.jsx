import {
	ButtonPrimary,
	InputShrink,
	TextLinkButton,
} from '../../../components';
import LoginStateStore from '../login-store/loginStore';
import './email.pwd.input.scss';

export default function LoginInputBox() {

const {id, pwd, setId, setPwd} = LoginStateStore();


/* 추후 유효성 체크 */
const test = () =>{
	const t = id == pwd ? 'ok' : 'fail';
	console.log(t);
}


	return (

		<div className='login-page mid'>
			<InputShrink
				className={'login-email-input'}
				id='email-input'
				type={'email'}
				labelText={'이메일'}
				onChange={(e) => {
					setId(e.target.value);
				}}
			/>

			<InputShrink
				className={'login-pwd-input'}
				id='pwd-input'
				type={'password'}
				labelText={'비밀번호'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ButtonPrimary className={'login-Btn'} onClick={test}>이메일로 시작하기</ButtonPrimary>

			<div className='register-resetting'>
				<TextLinkButton
					className={'login__font'}
					to='/signUp'
				>
					회원가입
				</TextLinkButton>
				<TextLinkButton
					className={'login__font'}
					to='/resetting'
				>
					비밀번호 재설정
				</TextLinkButton>
			</div>

			<hr />
		</div>
	);
}
