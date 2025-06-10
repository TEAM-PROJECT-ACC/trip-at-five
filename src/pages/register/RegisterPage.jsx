import './registerPage.scss';
import { PageContainer } from '../../components';
import {
	RegisterInfostore,
	useRegisterStore,
} from '../../states/register/RegisterStore';
import TitleText from './title-text/TitleText.component';
import Circle from './cricle/CircleComponent';
import RegisterEmail from './email/EmailComponent';
import RegisterPassword from './password/PasswordComponent';
import RegisterNickName from './nickName/NickNameComponent';
import RegisterTel from './Tel/Tel.component';
import RegisterAdress from './address/AddressComponent';
import RegisterComple from './comple/CompleComponent';
import { useEffect } from 'react';

export default function Register() {
	const { step, reset } = useRegisterStore();
	const { RegisterInfoReset } = RegisterInfostore();

	useEffect(() => {
		reset();
		RegisterInfoReset();
	}, []);

	const registerStep = [
		{
			id: 1,
			page: <RegisterEmail />,
		},
		{ id: 2, page: <RegisterPassword /> },
		{ id: 3, page: <RegisterNickName /> },
		{ id: 4, page: <RegisterTel /> },
		{ id: 5, page: <RegisterAdress /> },
		{ id: 6, page: <RegisterComple /> },
	];

	return (
		<PageContainer className='register-container'>
			<div className={`register-wrap register-email`}>
				<div className={`register-wrap-up`}>
					<TitleText
						className={'regitster-main-title'}
						text={`${step < 6 ? '회원가입' : '환영합니다.'}`}
					/>
					{step < 6 ? <Circle /> : ''}
				</div>

				{registerStep.map(
					(register) =>
						step === register.id && (
							<div
								className='register-wrap-down'
								key={register.id}
							>
								{register.page}
							</div>
						)
				)}
			</div>
		</PageContainer>
	);
}
