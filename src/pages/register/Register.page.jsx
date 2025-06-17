import './register.style.scss';
import { PageContainer } from '../../components';
import {
	useRegisterInfostore,
	useRegisterStore,
} from '../../states/register/registerStore';
import TitleText from './title-text/TitleText.component';
import Circle from './cricle/Circle.component';
import RegisterEmail from './email/Email.component';
import RegisterPassword from './password/Password.component';
import RegisterNickName from './nickName/NickName.component';
import RegisterTel from './Tel/Tel.component';
import RegisterAdress from './address/Address.component';
import RegisterComple from './comple/Comple.component';
import { useEffect } from 'react';

export default function Register() {
	const { step, resetRegisterStore } = useRegisterStore();
	const { resetRegisterInfoStore } = useRegisterInfostore();

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

	useEffect(() => {
		resetRegisterStore();
		resetRegisterInfoStore();
	}, []);

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
