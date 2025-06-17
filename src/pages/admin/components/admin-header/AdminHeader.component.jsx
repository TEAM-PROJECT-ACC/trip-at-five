import {
	MdContactSupport,
	FaHotel,
	FaCalendarAlt,
	FaCalendarTimes,
	MainLogoKr,
} from '../../../../assets/icons/index';
import { classNames } from '../../../../utils';
import { AdminLinkButton } from '../../../../components/buttons/admin-link-button/AdminLinkButton.component';
import { ADMIN_ROUTE } from '../../constants/routes-path/adminRoute.constant';
import './adminHeader.style.scss';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { isCancelCountAPI } from '../api/adminHeader.api';
import {
	loginAccountStore,
	loginStateStore,
} from '../../../../states/login/loginStore';
import { successAlert } from '../../../../utils/toastUtils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../services/login/loginService';

const buttonIcons = {
	accommodations: FaHotel,
	reservations: FaCalendarAlt,
	'cancel-reservations': FaCalendarTimes,
	contact: MdContactSupport,
};

export const AdminHeader = () => {
	const { data: resCancelCount } = useQuery({
		queryKey: ['cancelCount'],
		queryFn: async () => {
			const { data, status } = await isCancelCountAPI();

			if (status !== HttpStatusCode.Ok) {
				throw new Error('예약 취소 건수 조회 실패');
			}
			console.log('예약 취소 건수:', data);
			return data;
		},
		staleTime: 1000 * 60,
		retry: 3,
	});

	const { loginInfo } = loginStateStore();
	const { resetLoginAccountStore } = loginAccountStore();
  const { resetLoginedStateStore } = loginStateStore();
	const navigate = useNavigate();

	const logoutBtn = async () => {
		const result = await logout();
		if (result.data === 'ok') {
			successAlert('로그아웃 했습니다.');
			resetLoginAccountStore();
      resetLoginedStateStore();
			sessionStorage.clear();
			localStorage.clear();
			navigate('/');
		}
	};

	// TODO: 사용자 문의 실시간 데이터 확인 필요

	return (
		<header className='admin-header__container'>
			<div className='admin-header__inner'>
				<div className='admin-header__logo-container'>
					<MainLogoKr className='admin-header__logo' />
					<span className='admin-header__page-title admin-input'>
						{/* TODO: 관리자 계정의 이메일 아이디 값 */}
						{loginInfo.adminEmailId}
					</span>
					<AdminLinkButton
						className='admin-header__btn_logout'
						onClick={logoutBtn}
					>
						로그아웃
					</AdminLinkButton>
				</div>

				<div className='admin-header__link-container'>
					{ADMIN_ROUTE.map((route, idx) => {
						const Icons = buttonIcons[route.path];
						return (
							<div
								className='admin-header-button__container'
								key={idx}
							>
								<AdminLinkButton
									className={classNames(
										'admin-header__button',
										route.className
									)}
									to={route.path}
								>
									{<Icons className='admin-header__btn-icon' />}
									{route.title}
								</AdminLinkButton>
								{route.title === '예약취소요청' && resCancelCount > 0 && (
									<>
										<span className='admin-header__badge'>
											{resCancelCount}
										</span>
									</>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</header>
	);
};
