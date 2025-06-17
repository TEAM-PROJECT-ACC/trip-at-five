import { Navigate, useLocation } from 'react-router-dom';
import { loginAccountStore, loginStateStore } from '../../../states/login/loginStore';

const LoginInterceptor = ({ children }) => {
	const isAuthenticated = !!sessionStorage.getItem('Logged'); // 로그인 여부 확인
	const { isLogin, setIslogin } = loginAccountStore();
	const { loginInfo } = loginStateStore();
	const location = useLocation();

	// if (!isAuthenticated) {
	// 	return (
	// 		<Navigate
	// 			to='/login'
	// 			state={{ from: location }}
	// 			replace
	// 		/>
	// 	);
	// }
	// return children;

	return (
		<>
			{!isLogin ? (
				
				<Navigate
					to='/login'
					state={{ from: location }}
					replace
				/>
			) : (
				children
			)}
		</>
	);
};
export default LoginInterceptor;

