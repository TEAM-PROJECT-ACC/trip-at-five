import axios from 'axios';
import { VITE_SERVER_BASE_URL } from '../../../env.config';
import { infoAlert, warningAlertLeft } from '../../utils/toastUtils/toastUtils';
const baseServerAxios = axios.create({
	baseURL: VITE_SERVER_BASE_URL,
	withCredentials: true,
});

// 응답 인터셉터 설정
baseServerAxios.interceptors.response.use(
	function (response) {
		return response; // 정상 응답 반환
	},
	function (error) {
		console.log(error);

		if (error.response?.status === 401) {
			sessionStorage.removeItem('Logined');
			window.location.href = '/login';
		}

		if (error.code !== 'ERR_CANCELED') {
			warningAlertLeft('Interceptor!');
			infoAlert('세션이 끊어졌습니다 재로그인해주세요');
		}

		return Promise.reject(error);
	}
);

export default baseServerAxios;
