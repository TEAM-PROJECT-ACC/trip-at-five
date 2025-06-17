import { Navigate, useLocation } from 'react-router-dom';
import { loginAccountStore, loginStateStore } from '../../../../states/login/loginStore';


const AdminInterceptor = ({ children }) => {
	const isAuthenticated = !!sessionStorage.getItem('Logged'); // 로그인 여부 확인
	const { isLogin, setIslogin } = loginAccountStore();
	const { loginInfo } = loginStateStore();
	const location = useLocation();

	if (loginInfo.memType !== 'admin') {
		// 권한이 맞지 않는 경우
		return (
			<Navigate
				to='/'
				state={{ from: location }}
				replace
			/>
		);
	}
	// 접근 허용
	return <>{children}</>;
};
export default AdminInterceptor;
